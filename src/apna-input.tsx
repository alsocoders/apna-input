import * as React from "react"

import {
  type ApnaInputFormat,
  apnaInputFormatPresets,
  getApnaInputValidationMessage,
  sanitizeApnaInputValue,
} from "./lib/apna-input-formats"
import {
  defaultClassNames,
  mergeClassNames,
  type ApnaInputClassNames,
} from "./styles/default-class-names"
import type { ApnaInputRightAction } from "./types"
import { cn } from "./utils/cn"

export type { ApnaInputFormat } from "./lib/apna-input-formats"
export type { ApnaInputRightAction } from "./types"

export type ApnaInputProps = Omit<
  React.ComponentProps<"input">,
  "className" | "size" | "value" | "defaultValue" | "onChange"
> & {
  className?: string
  inputClassName?: string
  classNames?: ApnaInputClassNames
  left?: React.ReactNode
  right?: React.ReactNode | ApnaInputRightAction
  format?: ApnaInputFormat
  allowedRegex?: RegExp | string
  sanitize?: (value: string) => string
  label?: string
  invalidMessage?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onInvalid?: (
    message: string,
    event: React.InvalidEvent<HTMLInputElement>
  ) => void
}

function isRightAction(
  right: ApnaInputProps["right"]
): right is ApnaInputRightAction {
  return (
    typeof right === "object" &&
    right !== null &&
    !React.isValidElement(right) &&
    "icon" in right
  )
}

export function ApnaInput({
  className,
  inputClassName,
  classNames,
  left,
  right,
  disabled,
  format,
  allowedRegex,
  sanitize,
  label,
  invalidMessage,
  value,
  defaultValue = "",
  onValueChange,
  onChange,
  onInvalid,
  type,
  inputMode,
  maxLength,
  minLength,
  pattern,
  required,
  placeholder,
  ...props
}: ApnaInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const preset = format ? apnaInputFormatPresets[format] : undefined
  const hasInputRules = Boolean(
    format || allowedRegex || sanitize || maxLength !== undefined
  )

  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : uncontrolledValue

  const resolvedType = type ?? preset?.type ?? "text"
  const resolvedInputMode = inputMode ?? preset?.inputMode
  const resolvedMaxLength = maxLength ?? preset?.maxLength
  const resolvedMinLength = minLength ?? preset?.minLength
  const resolvedPattern = pattern ?? preset?.pattern
  const fieldLabel = label ?? placeholder
  const resolvedPlaceholder =
    resolvedType === "date" ||
    resolvedType === "datetime-local" ||
    resolvedType === "time"
      ? placeholder
      : placeholder ??
        (label
          ? `Enter ${label.replace(/\s*\*$/, "").toLowerCase()}`
          : undefined)

  const hasLeft = left !== undefined && left !== null && left !== false
  const hasRight = right !== undefined && right !== null && right !== false
  const rightAction = isRightAction(right) ? right : null

  const mergedClassNames = React.useMemo(
    () =>
      mergeClassNames(defaultClassNames, classNames, {
        root: className,
        input: inputClassName,
      }),
    [className, classNames, inputClassName]
  )

  function applySanitize(nextValue: string) {
    return sanitizeApnaInputValue({
      value: nextValue,
      format,
      allowedRegex,
      maxLength: resolvedMaxLength,
      customSanitize: sanitize,
    })
  }

  function updateValue(nextRawValue: string) {
    const nextValue = hasInputRules ? applySanitize(nextRawValue) : nextRawValue

    if (!isControlled) {
      setUncontrolledValue(nextValue)
    }

    onValueChange?.(nextValue)
    return nextValue
  }

  function getValidationMessage(value: string) {
    return (
      invalidMessage ??
      (getApnaInputValidationMessage({
        value,
        label: fieldLabel,
        required: Boolean(required),
        minLength: resolvedMinLength,
        pattern: resolvedPattern,
      }) || `Please enter valid ${fieldLabel ?? "this field"}.`)
    )
  }

  function handleInvalid(event: React.InvalidEvent<HTMLInputElement>) {
    const message = getValidationMessage(event.currentTarget.value)
    event.preventDefault()
    onInvalid?.(message, event)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = updateValue(event.target.value)

    const message = getApnaInputValidationMessage({
      value: nextValue,
      label: fieldLabel,
      required: Boolean(required),
      minLength: resolvedMinLength,
      pattern: resolvedPattern,
    })

    if (!message && inputRef.current) {
      inputRef.current.setCustomValidity("")
    }

    if (onChange) {
      event.target.value = nextValue
      onChange(event)
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    if (!hasInputRules) {
      return
    }

    event.preventDefault()

    const pastedValue = event.clipboardData.getData("text")
    const input = event.currentTarget
    const selectionStart = input.selectionStart ?? currentValue.length
    const selectionEnd = input.selectionEnd ?? currentValue.length
    const mergedValue =
      currentValue.slice(0, selectionStart) +
      pastedValue +
      currentValue.slice(selectionEnd)

    const nextValue = applySanitize(mergedValue)
    updateValue(mergedValue)

    if (
      inputRef.current &&
      !getApnaInputValidationMessage({
        value: nextValue,
        label: fieldLabel,
        required: Boolean(required),
        minLength: resolvedMinLength,
        pattern: resolvedPattern,
      })
    ) {
      inputRef.current.setCustomValidity("")
    }
  }

  return (
    <div
      className={cn(
        mergedClassNames.root,
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
      <div
        className={cn(
          mergedClassNames.field,
          disabled && "apna-input-field--disabled"
        )}
        aria-disabled={disabled || undefined}
      >
        {hasLeft ? (
          <div className={mergedClassNames.left}>{left}</div>
        ) : null}

        <input
          ref={inputRef}
          disabled={disabled}
          data-slot="apna-input"
          type={resolvedType}
          inputMode={resolvedInputMode}
          maxLength={resolvedMaxLength}
          minLength={resolvedMinLength}
          pattern={resolvedPattern}
          required={required}
          placeholder={resolvedPlaceholder}
          value={hasInputRules || isControlled ? currentValue : undefined}
          defaultValue={
            !hasInputRules && !isControlled ? defaultValue : undefined
          }
          onChange={handleChange}
          onInvalid={handleInvalid}
          onPaste={handlePaste}
          className={mergedClassNames.input}
          {...props}
        />

        {hasRight ? (
          rightAction ? (
            <button
              type={rightAction.type ?? "button"}
              disabled={disabled || rightAction.disabled}
              aria-label={rightAction.ariaLabel}
              onClick={rightAction.onClick}
              className={mergedClassNames.actionButton}
            >
              {rightAction.icon}
            </button>
          ) : (
            <div className={mergedClassNames.right}>{right as React.ReactNode}</div>
          )
        ) : null}
      </div>
    </div>
  )
}
