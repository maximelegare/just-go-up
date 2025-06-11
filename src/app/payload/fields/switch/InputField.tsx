'use client'

import { Switch } from '@app/components/ui/switch'

import { useField, FieldLabel } from '@payloadcms/ui'
import { SwicthField } from './types'

export type Props = Omit<SwicthField, 'type'> & {
  path?: string
  inputRef?: React.MutableRefObject<HTMLInputElement>
}

export const InputField: React.FC<Props> = (props) => {
  const { path, label, validate } = props

  const { value = false, setValue } = useField<boolean>({
    path,
    validate,
  })

  return (
    <div className="w-fit mb-5">
      <FieldLabel htmlFor={path} label={label as string | Record<string, string>} />
      <div className="flex items-center gap-2">
        <Switch id={path} onCheckedChange={setValue} checked={value} />
        <span className="text-[var(--theme-elevation-500)]" onClick={() => setValue(!value)}>
          {value ? 'On' : 'Off'}
        </span>
      </div>
    </div>
  )
}
