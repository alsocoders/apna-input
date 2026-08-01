export const defaultClassNames = {
  root: "apna-input",
  label: "apna-input-label",
  labelRequired: "apna-input-label-required",
  field: "apna-input-field",
  input: "apna-input-native",
  left: "apna-input-adornment apna-input-adornment--left",
  right: "apna-input-adornment apna-input-adornment--right",
  actionButton: "apna-input-action-button",
  textareaRoot: "apna-input",
  textarea: "apna-textarea",
  otpRoot: "apna-otp",
  otpContainer: "apna-otp-container",
  otpGroup: "apna-otp-group",
  otpSlot: "apna-otp-slot",
  otpCaret: "apna-otp-caret",
  otpSeparator: "apna-otp-separator",
} as const

export type ApnaInputClassNames = Partial<
  Record<keyof typeof defaultClassNames, string>
>

export function mergeClassNames(
  defaults: ApnaInputClassNames,
  overrides?: ApnaInputClassNames,
  shortcuts?: {
    root?: string
    input?: string
    textarea?: string
    otpRoot?: string
  }
): Record<keyof typeof defaultClassNames, string> {
  const merged = { ...defaults }

  if (overrides) {
    for (const key of Object.keys(overrides) as (keyof ApnaInputClassNames)[]) {
      if (overrides[key]) {
        merged[key] = `${merged[key]} ${overrides[key]}`.trim()
      }
    }
  }

  if (shortcuts?.root) {
    merged.root = `${merged.root} ${shortcuts.root}`.trim()
    merged.textareaRoot = `${merged.textareaRoot} ${shortcuts.root}`.trim()
  }

  if (shortcuts?.input) {
    merged.input = `${merged.input} ${shortcuts.input}`.trim()
  }

  if (shortcuts?.textarea) {
    merged.textarea = `${merged.textarea} ${shortcuts.textarea}`.trim()
  }

  if (shortcuts?.otpRoot) {
    merged.otpRoot = `${merged.otpRoot} ${shortcuts.otpRoot}`.trim()
  }

  return merged as Record<keyof typeof defaultClassNames, string>
}
