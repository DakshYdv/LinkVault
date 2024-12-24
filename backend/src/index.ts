import express, { response } from 'express'
import { Request, Response } from 'express'
import { Link, PrismaClient } from '@prisma/client'
import jwt, { decode } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { userMiddleware } from './middleware'
import bcrypt, { hash } from "bcrypt"
import { hashedLink } from './functions'
import cors from 'cors'

const saltRound = 10
dotenv.config()
const JWT_PASSWORD = process.env.JWT_PASSWORD;
const app = express()
app.use(express.json())
app.use(cors())
const client = new PrismaClient()

const main = async () => {
    try {
        await client.$connect()
        console.log(`database has been connected`);
    } catch (err) {
        console.log(`an error occured while connecting to the database: ${err}`);
    }
}
main()

interface User {
    username: string;
    password: string
}

interface Content {
    title: string;
    type: string;
    link: string
}

interface CustomRequest extends Request{
    user?: {
        username: string
    }
}

app.post("/signup", async (req: Request<{}, {}, User>, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRound)
        await client.user.create({
            data: {
                username: username,
                password: hashedPassword
            }
        })
        res.status(200).json({
            message: 'user signed up'
        })
    } catch (err) {
        res.status(403).json({
            message: "invalid credentials"
        })
    }
})

app.post("/signin", async (req: Request<{}, {}, User>, res: Response) => {
    const username = req.body?.username;
    const password = req.body?.password;
    const existingUser = await client.user.findFirst({
        where: {
            username: username,
        } 
    })
    if (!existingUser) {
        res.status(403).json({
            error: "user does not exist"
        })
        return
    }
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch) {
        res.status(403).json({
            error: "wrong password"
        })
        return
    }
    try {
        const token = await jwt.sign(existingUser.username, JWT_PASSWORD as unknown as string)
        res.status(200).json({
            token: token
        })
    } catch (err) {
        res.status(401).json({
            message: "invalid credentials"
        })
    }  
})

app.get("/dashboard", userMiddleware, async (req: CustomRequest, res: Response) => {
    const username = req.user?.username
    try {
        const user = await client.user.findFirst({
            where: {
                username
            }
        }) 
        const userId = user?.id
        const content = await client.content.findMany({
            where: {
                userId
            }
        })
        if (content.length === 0) {
            res.status(404).json({
                message: "there does not exist any data for this user"
            })
            return
        }
        res.status(200).json({
            content
        })
    } catch (err) {
        res.status(403).json({
            message: "couldn't fetch data"
        })
    }
})

app.post("/content", userMiddleware, async (req: CustomRequest, res: Response) => {
    const title = req.body.title;
    const type = req.body.type;
    const link = req.body.link;
    const username = req.user?.username
    const existingUser = await client.user.findFirst({
        where: {
            username
        }
    })
    const userId = existingUser?.id 
   try {
    await client.content.create({
        // @ts-ignore
        data: {
            title,
            type,
            link,
            userId
        }
    })
    res.status(200).json({
        message: "content has been added"
    })
   } catch (err) {
    res.status(403).json({
        message: "couldn't add content"
    })
   } 
})

app.delete("/delete/:title", userMiddleware, async (req: CustomRequest, res: Response) => {
    const title: string = req.params.title
    const username = req.user?.username
    console.log(`title: ${title}`);
    console.log(`username: ${username}`);
    const user = await client.user.findFirst({
        where: {
            username
        }
    })
    console.log(`user: ${user}`);
    const userId = user?.id
    console.log(`userid: ${userId}`);
    const content = await client.content.findFirst({
        where: {
            userId,
            title
        }
    })
    const contentId = content?.id
   try {
    await client.content.delete({
        // @ts-ignore
        where: {
            id: contentId
        }
    })
    res.status(200).json({
        message: "content has been deleted"
    })
   } catch (err) {
    res.status(403).json({
        message: "couldn't delet data"
    })
   } 
})

app.post("/share", userMiddleware, async (req: Request, res: Response) => {
    const share: boolean = req.body.share;
    const hash: string = hashedLink(10)
    const user = (req as any).user as { username: string}
    const username: string = user.username
    const existingUser = await client.user.findFirst({
        where: {
            username
        }
    })
    const userId = existingUser?.id
    const existingLink = await client.link.findFirst({
        where: {
            userId
        }
    })
    if (share) {
        if (existingLink) {
            res.status(200).json({
                link: `localhost:3000/share/:${existingLink.hash}`
            })
            return
        }
        const shareLink = await client.link.create({
            // @ts-ignore
            data: {
                hash,
                userId 
            }
        })
        res.status(200).json({
            link: `localhost:3000/share/:${hash}`
        })
    }
    if (!share) {
        const previousLink = await client.link.findFirst({
            where: {
                userId
            }
        })
        if (!previousLink) {
            res.status(403).json({
                message: "there is no existing link"
            })
            return
        }
        const previousLinkid = previousLink?.id
        await client.link.delete({
            // @ts-ignore
            where: {
                id: previousLinkid
            }
        }) 
        res.status(200).json({
            message: "shareable link disabled"
        })
    }
})

app.get("/share/:sharelink", async (req: Request, res: Response) => {
    const hash = req.params.sharelink
    try {
        const link = await client.link.findFirst({
            where: {
                hash: hash
            }
        })
        const userId = link?.userId
        const content = await client.content.findMany({
            where: {
                userId: userId
            }
        })
        res.status(200).json({
            content
        })
    } catch (err) {
        res.status(403).json({
            message: "couldn't fetch data"
        })
        console.log(`there was an error displaying the shared content: ${err}`);
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})
