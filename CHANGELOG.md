# Changelog

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
