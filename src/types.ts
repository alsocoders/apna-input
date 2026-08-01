import type { ReactNode, MouseEvent } from "react"

export type { ApnaInputFormat, ApnaInputFormatPreset } from "./lib/apna-input-formats"

export type ApnaInputRightAction = {
  icon: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  ariaLabel?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}
