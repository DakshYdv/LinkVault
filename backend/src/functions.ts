export const hashedLink = (num: number) => {
    const options = 'qwertyuioplkjhgfdsazxcvbnm1234567890'
    let hash = ""
    for (let i = 0; i < num; i++) {
        const random = Math.floor(Math.random()*options.length)
        hash += options[random]
    }
    return hash
}