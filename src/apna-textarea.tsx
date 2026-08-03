import * as React from "react"

import {
  defaultClassNames,
  mergeClassNames,
  type ApnaInputClassNames,
} from "./styles/default-class-names"
import { cn } from "./utils/cn"

export type ApnaTextareaProps = Omit<
  React.ComponentProps<"textarea">,
  "className" | "value" | "defaultValue" | "onChange"
> & {
  className?: string
  classNames?: ApnaInputClassNames
  label?: string
  error?: string | Error | null
  errorText?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function resolveErrorMessage(
  error: string | Error | null | undefined,
  errorText?: string
) {
  if (errorText) {
    return errorText
  }

  if (!error) {
    return undefined
  }

  return typeof error === "string" ? error : error.message
}

export function ApnaTextarea({
  className,
  classNames,
  label,
  required,
  disabled,
  error,
  errorText,
  value,
  defaultValue,
  onValueChange,
  onChange,
  ...props
}: ApnaTextareaProps) {
  const mergedClassNames = React.useMemo(
    () =>
      mergeClassNames(defaultClassNames, classNames, {
        root: className,
        textarea: className,
      }),
    [className, classNames]
  )

  const resolvedErrorMessage = resolveErrorMessage(error, errorText)
  const hasError = Boolean(resolvedErrorMessage)

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onValueChange?.(event.target.value)
    onChange?.(event)
  }

  const textarea = (
    <textarea
      data-slot="apna-textarea"
      disabled={disabled}
      required={required}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      aria-invalid={hasError || undefined}
      className={cn(
        mergedClassNames.textarea,
        hasError && "apna-textarea--error"
      )}
      {...props}
    />
  )

  if (!label && !hasError) {
    return textarea
  }

  return (
    <div
      className={cn(
        mergedClassNames.textareaRoot,
        label && "apna-input--with-label"
      )}
    >
      {label ? (
        <label className={mergedClassNames.label}>
          {label}
          {required ? (
            <span className={mergedClassNames.labelRequired}> *</span>
          ) : null}
        </label>
      ) : null}
      {textarea}
      {hasError ? (
        <p className="apna-textarea-error" role="alert">
          {resolvedErrorMessage}
        </p>
      ) : null}
    </div>
  )
}
