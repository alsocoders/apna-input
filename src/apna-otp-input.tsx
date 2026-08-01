import * as React from "react"
import {
  OTPInput,
  OTPInputContext,
  REGEXP_ONLY_DIGITS,
  type OTPInputProps,
} from "input-otp"

import {
  defaultClassNames,
  mergeClassNames,
  type ApnaInputClassNames,
} from "./styles/default-class-names"
import { cn } from "./utils/cn"

export type ApnaOtpSlotProps = React.ComponentProps<"div"> & {
  index: number
}

export type ApnaOtpGroupProps = React.ComponentProps<"div">

export type ApnaOtpSeparatorProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}

export type ApnaOtpInputProps = Omit<
  OTPInputProps,
  "maxLength" | "containerClassName" | "className" | "children" | "render"
> & {
  length?: number
  groups?: number[]
  className?: string
  classNames?: ApnaInputClassNames
  label?: string
  required?: boolean
  invalid?: boolean
  invalidMessage?: string
  separator?: React.ReactNode | boolean
  mask?: boolean
  onValueChange?: (value: string) => void
  onComplete?: (code: string) => void
  onInvalid?: (message: string) => void
  render?: (context: { length: number }) => React.ReactNode
}

const ApnaOtpMaskContext = React.createContext(false)
const ApnaOtpInvalidContext = React.createContext(false)

function buildGroupRanges(groups: number[]) {
  const ranges: Array<{ start: number; end: number }> = []
  let cursor = 0

  for (const size of groups) {
    ranges.push({ start: cursor, end: cursor + size })
    cursor += size
  }

  return ranges
}

export function ApnaOtpSlot({
  index,
  className,
  ...props
}: ApnaOtpSlotProps) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const mask = React.useContext(ApnaOtpMaskContext)
  const invalid = React.useContext(ApnaOtpInvalidContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="apna-otp-slot"
      data-active={isActive}
      aria-invalid={invalid || undefined}
      className={cn("apna-otp-slot", className)}
      {...props}
    >
      {char ? (mask ? "•" : char) : null}
      {hasFakeCaret && !char ? (
        <div className={cn("apna-otp-caret", "apna-otp-caret--visible")} aria-hidden />
      ) : null}
    </div>
  )
}

export function ApnaOtpGroup({ className, ...props }: ApnaOtpGroupProps) {
  return (
    <div
      data-slot="apna-otp-group"
      className={cn("apna-otp-group", className)}
      {...props}
    />
  )
}

export function ApnaOtpSeparator({
  className,
  children,
  ...props
}: ApnaOtpSeparatorProps) {
  return (
    <div
      data-slot="apna-otp-separator"
      role="separator"
      className={cn("apna-otp-separator", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function DefaultOtpLayout({
  length,
  groups,
  separator,
  slotClassName,
  groupClassName,
  separatorClassName,
}: {
  length: number
  groups?: number[]
  separator?: React.ReactNode | boolean
  slotClassName?: string
  groupClassName?: string
  separatorClassName?: string
}) {
  const resolvedGroups = groups ?? [length]
  const ranges = buildGroupRanges(resolvedGroups)

  const separatorNode =
    separator === false
      ? null
      : separator === true || separator === undefined
        ? <ApnaOtpSeparator className={separatorClassName} />
        : separator

  return (
    <>
      {ranges.map((range, groupIndex) => (
        <React.Fragment key={`${range.start}-${range.end}`}>
          {groupIndex > 0 ? separatorNode : null}
          <ApnaOtpGroup className={groupClassName}>
            {Array.from({ length: range.end - range.start }, (_, offset) => (
              <ApnaOtpSlot
                key={range.start + offset}
                index={range.start + offset}
                className={slotClassName}
              />
            ))}
          </ApnaOtpGroup>
        </React.Fragment>
      ))}
    </>
  )
}

export function ApnaOtpInput({
  length = 6,
  groups,
  className,
  classNames,
  label,
  required,
  invalid,
  invalidMessage,
  separator,
  mask = false,
  value,
  defaultValue,
  onChange,
  onValueChange,
  onComplete,
  onInvalid,
  disabled,
  pattern = REGEXP_ONLY_DIGITS,
  autoComplete = "one-time-code",
  render,
  ...props
}: ApnaOtpInputProps) {
  const mergedClassNames = React.useMemo(
    () =>
      mergeClassNames(defaultClassNames, classNames, {
        otpRoot: className,
      }),
    [className, classNames]
  )

  function handleChange(nextValue: string) {
    onChange?.(nextValue)
    onValueChange?.(nextValue)

    if (nextValue.length === length) {
      onComplete?.(nextValue)
    }
  }

  function handleInvalid() {
    const message = invalidMessage ?? `Please enter the ${length}-digit code.`
    onInvalid?.(message)
  }

  const resolvedGroups = groups ?? [length]
  const showSeparator = separator !== false && resolvedGroups.length > 1

  return (
    <div
      className={cn(
        mergedClassNames.otpRoot,
        label && "apna-otp--with-label"
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

      <ApnaOtpMaskContext.Provider value={mask}>
        <ApnaOtpInvalidContext.Provider value={Boolean(invalid)}>
          <OTPInput
          data-slot="apna-otp-input"
          maxLength={length}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          pattern={pattern}
          autoComplete={autoComplete}
          spellCheck={false}
          aria-invalid={invalid || undefined}
          containerClassName={mergedClassNames.otpContainer}
          className="apna-otp-native"
          onComplete={onComplete}
          {...props}
        >
          {render ? (
            render({ length })
          ) : (
            <DefaultOtpLayout
              length={length}
              groups={resolvedGroups}
              separator={showSeparator ? (separator ?? true) : false}
              slotClassName={mergedClassNames.otpSlot}
              groupClassName={mergedClassNames.otpGroup}
              separatorClassName={mergedClassNames.otpSeparator}
            />
          )}
        </OTPInput>
        </ApnaOtpInvalidContext.Provider>
      </ApnaOtpMaskContext.Provider>

      {invalid && invalidMessage ? (
        <p className="apna-otp-error" role="alert">
          {invalidMessage}
        </p>
      ) : null}

      {required ? (
        <input
          type="text"
          tabIndex={-1}
          aria-hidden
          required
          value={value ?? ""}
          onChange={() => undefined}
          onInvalid={handleInvalid}
          className="apna-otp-hidden-validator"
        />
      ) : null}
    </div>
  )
}
