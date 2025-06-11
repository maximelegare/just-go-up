import { kebabToCamelCase } from './kebabToCamelCase'

interface StyleObject {
  [key: string]: string
}

export const parseCSSStylesString = (styleString: string) => {
  return styleString.split(';').reduce((styleObject, styleProperty) => {
    const [property, value] = styleProperty.split(':').map((item) => item.trim())
    if (property && value) {
      const camelproperty = kebabToCamelCase(property)
      styleObject[camelproperty] = value
    }
    return styleObject
  }, {} as StyleObject)
}
