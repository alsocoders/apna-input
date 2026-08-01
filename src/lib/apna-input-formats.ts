export type ApnaInputFormat =
  | "phone-india"
  | "digits"
  | "alpha"
  | "alphanumeric"
  | "email"

export type ApnaInputFormatPreset = {
  type?: "text" | "tel" | "email" | "number" | "password" | "search"
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
  maxLength?: number
  minLength?: number
  pattern?: string
  allowedRegex?: RegExp
  sanitize: (value: string) => string
}

export function sanitizeIndianPhone(value: string, maxLength = 10) {
  let digits = value.replace(/\D/g, "")

  if (digits.length === maxLength + 2 && digits.startsWith("91")) {
    digits = digits.slice(2)
  } else if (digits.length === maxLength + 1 && digits.startsWith("0")) {
    digits = digits.slice(1)
  }

  return digits.slice(0, maxLength)
}

export function sanitizeWithAllowedRegex(
  value: string,
  regex: RegExp,
  maxLength?: number
) {
  const nextValue = value
    .split("")
    .filter((char) => regex.test(char))
    .join("")

  return maxLength !== undefined ? nextValue.slice(0, maxLength) : nextValue
}

export const apnaInputFormatPresets: Record<
  ApnaInputFormat,
  ApnaInputFormatPreset
> = {
  "phone-india": {
    type: "tel",
    inputMode: "numeric",
    maxLength: 10,
    minLength: 10,
    pattern: "[6-9][0-9]{9}",
    allowedRegex: /\d/,
    sanitize: (value) => sanitizeIndianPhone(value, 10),
  },
  digits: {
    type: "text",
    inputMode: "numeric",
    allowedRegex: /\d/,
    sanitize: (value) => sanitizeWithAllowedRegex(value, /\d/),
  },
  alpha: {
    type: "text",
    allowedRegex: /[a-zA-Z\s]/,
    sanitize: (value) => sanitizeWithAllowedRegex(value, /[a-zA-Z\s]/),
  },
  alphanumeric: {
    type: "text",
    allowedRegex: /[a-zA-Z0-9\s]/,
    sanitize: (value) => sanitizeWithAllowedRegex(value, /[a-zA-Z0-9\s]/),
  },
  email: {
    type: "email",
    inputMode: "email",
    sanitize: (value) => value.trim().toLowerCase(),
  },
}

export function toRegExp(value: RegExp | string) {
  return typeof value === "string" ? new RegExp(value) : value
}

export function getApnaInputValidationMessage({
  value,
  label,
  required,
  minLength,
  pattern,
}: {
  value: string
  label?: string
  required?: boolean
  minLength?: number
  pattern?: string
}) {
  const fieldLabel = label?.trim() || "this field"
  const trimmedValue = value.trim()

  if (required && !trimmedValue) {
    return `Please enter ${fieldLabel}.`
  }

  if (
    minLength !== undefined &&
    trimmedValue.length > 0 &&
    trimmedValue.length < minLength
  ) {
    return `Please enter valid ${fieldLabel}.`
  }

  if (
    pattern &&
    trimmedValue.length >= (minLength ?? 1) &&
    !new RegExp(`^(?:${pattern})$`).test(trimmedValue)
  ) {
    return `Please enter valid ${fieldLabel}.`
  }

  return ""
}

export function sanitizeApnaInputValue({
  value,
  format,
  allowedRegex,
  maxLength,
  customSanitize,
}: {
  value: string
  format?: ApnaInputFormat
  allowedRegex?: RegExp | string
  maxLength?: number
  customSanitize?: (value: string) => string
}) {
  if (customSanitize) {
    return customSanitize(value)
  }

  const preset = format ? apnaInputFormatPresets[format] : undefined

  if (preset) {
    return preset.sanitize(value)
  }

  if (allowedRegex) {
    const regex = toRegExp(allowedRegex)
    return sanitizeWithAllowedRegex(value, regex, maxLength)
  }

  if (maxLength !== undefined) {
    return value.slice(0, maxLength)
  }

  return value
}
