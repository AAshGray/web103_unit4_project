export const calcTotalPrice = (modelPrice, colorPrice, roofPrice, wheelPrice, interiorPrice) => {
    return (modelPrice || 0) + (colorPrice || 0) + (roofPrice || 0) + (wheelPrice || 0) + (interiorPrice || 0)
}