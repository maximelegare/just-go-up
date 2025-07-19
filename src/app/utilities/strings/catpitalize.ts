export const capitalize = (str: string): string => {
  if (!str) return "NO STRING"
  return str.charAt(0).toUpperCase() + str.slice(1)
}
