export { ApnaInput } from "./apna-input"
export type { ApnaInputProps } from "./apna-input"
export type { ApnaInputFormat } from "./apna-input"

export { ApnaTextarea } from "./apna-textarea"
export type { ApnaTextareaProps } from "./apna-textarea"

export {
  ApnaOtpInput,
  ApnaOtpSlot,
  ApnaOtpGroup,
  ApnaOtpSeparator,
} from "./apna-otp-input"
export type {
  ApnaOtpInputProps,
  ApnaOtpSlotProps,
  ApnaOtpGroupProps,
  ApnaOtpSeparatorProps,
} from "./apna-otp-input"

export type { ApnaInputRightAction } from "./types"
export type { ApnaInputClassNames } from "./styles/default-class-names"
export type { ApnaInputFormatPreset } from "./lib/apna-input-formats"

export {
  apnaInputFormatPresets,
  sanitizeApnaInputValue,
  getApnaInputValidationMessage,
  sanitizeIndianPhone,
  sanitizeWithAllowedRegex,
  toRegExp,
} from "./lib/apna-input-formats"

export { defaultClassNames, mergeClassNames } from "./styles/default-class-names"
