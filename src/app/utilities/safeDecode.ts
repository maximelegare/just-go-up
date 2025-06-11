export const safeDecode = (value: string) => {
  try {
    const decoded = decodeURIComponent(value)
    return encodeURIComponent(decoded) === value ? value : decoded
  } catch (e: any) {
    console.log(e)
    return value
  }
}
