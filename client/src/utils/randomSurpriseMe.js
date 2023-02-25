import surpriseMe from "../data/surpriseMe"

const randomSurpriseMe = (currentValue) => {
    const newValue = surpriseMe[Math.floor(Math.random() * surpriseMe.length)]
    if(newValue === currentValue) return randomSurpriseMe(currentValue)
    return newValue
}

export default randomSurpriseMe