export const htmlFontSize = 10

export const baselinePX = 20

export const baseFn = (multiplier = 1): string => `${(baselinePX / htmlFontSize) * multiplier}rem`

export const twb = (tailwindProperty: string, base: number) =>
  `${tailwindProperty}-[${baseFn(base)}rem]`

export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')
