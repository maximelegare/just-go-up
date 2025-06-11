'use client'

import '@app/(frontend)/[locale]/styles/theme.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs-list'
import { ThemeColorsView } from './views/ThemeColorsView'
import { ColorPickerView } from './views/ColorPickerView'
import { useState } from 'react'

type DropdownColorPickerProps = {
  fontColor?: string
  onFontColorChange: (color: string, cssVariableColor?: string) => void
  onApplyStyles: () => void
}

export type ColorFormat = 'hex' | 'hsl' | 'rgb'

const defaultColor = '#000000'

export const ColorPicker = ({
  fontColor = defaultColor,
  onFontColorChange,
  onApplyStyles,
}: DropdownColorPickerProps) => {
  const [ColorFormat, setColorFormat] = useState<ColorFormat>('hex')

  return (
    <div className="flex">
      <Tabs defaultValue="theme" className="h-[350px] w-[310px]">
        <TabsList className="gap-1 mb-2">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="color-picker">Color Picker</TabsTrigger>
        </TabsList>
        <TabsContent value="theme">
          <ThemeColorsView
            colorFormat={ColorFormat}
            onColorFormatChange={setColorFormat}
            onFontColorChange={onFontColorChange}
          />
        </TabsContent>
        <TabsContent value="color-picker">
          <ColorPickerView
            onApplyStyles={onApplyStyles}
            fontColor={fontColor}
            onFontColorChange={onFontColorChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
