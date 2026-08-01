import * as React from "react"

import {
  defaultClassNames,
  mergeClassNames,
  type ApnaInputClassNames,
} from "./styles/default-class-names"
import { cn } from "./utils/cn"

export type ApnaTextareaProps = Omit<
  React.ComponentProps<"textarea">,
  "className"
> & {
  className?: string
  classNames?: ApnaInputClassNames
  label?: string
}

export function ApnaTextarea({
  className,
  classNames,
  label,
  required,
  disabled,
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

  const textarea = (
    <textarea
      data-slot="apna-textarea"
      disabled={disabled}
      required={required}
      className={mergedClassNames.textarea}
      {...props}
    />
  )

  if (!label) {
    return textarea
  }

  return (
    <div
      className={cn(
        mergedClassNames.textareaRoot,
        "apna-input--with-label"
      )}
    >
      <label className={mergedClassNames.label}>
        {label}
        {required ? (
          <span className={mergedClassNames.labelRequired}> *</span>
        ) : null}
      </label>
      {textarea}
    </div>
  )
}
