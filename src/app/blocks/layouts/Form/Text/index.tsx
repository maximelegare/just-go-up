import type { TextField } from "@payloadcms/plugin-form-builder/types"
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form"

import { Input } from "@app/components/ui/input"
import { Label } from "@app/components/ui/label"
import React from "react"

import { Error } from "../Error"
import { Width } from "../Width"

export const Text: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <Width width={width}>
      <Label required={requiredFromProps} htmlFor={name}>
        {label}
      </Label>
      <Input
        defaultValue={defaultValue}
        placeholder={label}
        id={name}
        type="text"
        className="rounded-[0.5rem] border-border bg-muted  px-3 py-1 text-base   file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  hover:border-accent focus-visible:ring-offset-0 focus:border-accent focus:shadow-input-focus outline-none focus-visible:ring-0  focus-visible:shadow-input-focus transition-all"
        {...register(name, { required: requiredFromProps })}
      />
      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
