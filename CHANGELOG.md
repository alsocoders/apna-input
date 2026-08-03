# Changelog

## 0.1.2 — 2026-08-04

### Fixed

- Tighter validation error spacing under inputs, textarea, and OTP fields

## 0.1.1 — 2026-08-03

### Added

- `ApnaInput` — `error` / `errorText` props with error border and message UI
- `ApnaTextarea` — `error` / `errorText`, `onValueChange`, controlled `value` / `defaultValue`
- `ApnaOtpInput` — `name` hidden input for native forms, `onBlur`, `error` / `errorText` aliases

## 0.1.0 — 2026-08-01

### Added

- `ApnaInput` with format presets, left/right adornments, password toggle, and `onInvalid` callback
- `ApnaTextarea` with optional label
- `ApnaOtpInput` with configurable length, groups, mask, and composable slot API
- Vanilla CSS theming via `--apna-input-*` / `--apna-otp-*` variables with shadcn token fallbacks
- `classNames` slot overrides for Tailwind and non-Tailwind users
- Dark theme via `data-apna-input-theme="dark"`
- Exported format utilities (`sanitizeApnaInputValue`, `apnaInputFormatPresets`, etc.)
- Vite + Tailwind v4 playground
