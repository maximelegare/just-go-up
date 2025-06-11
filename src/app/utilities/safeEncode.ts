export const safeEncode = (value: string) => {
  try {
    const decoded = decodeURIComponent(value)

    return encodeURIComponent(decoded)
  } catch (e: any) {
    console.log(e)
    return encodeURIComponent(value)
  }
}
