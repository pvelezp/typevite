
export const randomCharacter = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase()
   return  alphabet[Math.floor(Math.random() * alphabet.length)]
}