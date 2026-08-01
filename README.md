# @alsocoder/apna-input

React input, textarea, and OTP components with format presets, adornments, and full CSS customization. Works with or without Tailwind.

## Install

```bash
npm install @alsocoder/apna-input
```

Peer dependencies: `react` and `react-dom` (>= 18).

## Quick start

```tsx
import "@alsocoder/apna-input/styles.css"
import { ApnaInput } from "@alsocoder/apna-input"

export function Example() {
  return <ApnaInput placeholder="Enter your name" />
}
```

## Components

### ApnaInput

Text input with optional label, left/right adornments, format presets, and sanitization.

```tsx
<ApnaInput
  label="Mobile"
  format="phone-india"
  left="+91"
  required
  value={phone}
  onValueChange={setPhone}
  onInvalid={(message) => console.error(message)}
/>
```

**Format presets:** `phone-india`, `digits`, `alpha`, `alphanumeric`, `email`

**Right action (password toggle):**

```tsx
<ApnaInput
  type={show ? "text" : "password"}
  right={{
    icon: <EyeIcon />,
    onClick: () => setShow((v) => !v),
    ariaLabel: "Toggle password",
  }}
/>
```

### ApnaTextarea

```tsx
<ApnaTextarea label="Description" rows={3} placeholder="Write notes..." />
```

### ApnaOtpInput

Segmented OTP input with configurable length, grouping, paste support, and iOS SMS autofill.

```tsx
<ApnaOtpInput
  length={6}
  groups={[3, 3]}
  value={otp}
  onValueChange={setOtp}
  onComplete={(code) => verify(code)}
  autoFocus
  name="otp"
/>
```

**Props:**

| Prop | Default | Description |
|------|---------|-------------|
| `length` | `6` | Number of digits/slots |
| `groups` | `[length]` | Visual groups, e.g. `[3, 3]` |
| `mask` | `false` | Show bullets instead of characters |
| `separator` | auto | `true`, `false`, or custom ReactNode |
| `onComplete` | — | Called when all slots are filled |
| `invalid` | — | Error styling |
| `invalidMessage` | — | Error text below input |

**Composable API:**

```tsx
import {
  ApnaOtpInput,
  ApnaOtpGroup,
  ApnaOtpSlot,
  ApnaOtpSeparator,
} from "@alsocoder/apna-input"

<ApnaOtpInput length={6} value={otp} onValueChange={setOtp}
  render={() => (
    <ApnaOtpGroup>
      <ApnaOtpSlot index={0} />
      {/* ... */}
      <ApnaOtpSeparator />
      <ApnaOtpSlot index={3} />
    </ApnaOtpGroup>
  )}
/>
```

## Theming

### Level 1 — CSS variables (no Tailwind)

```css
.my-form {
  --apna-input-field-border: #3b82f6;
  --apna-input-radius: 1rem;
  --apna-otp-slot-size: 3rem;
}
```

### Level 2 — shadcn tokens

Define `--primary`, `--border`, `--input`, `--foreground`, etc. on `:root`. Package CSS picks them up automatically via fallbacks.

### Level 3 — classNames overrides

```tsx
<ApnaInput
  classNames={{
    field: "rounded-xl shadow-sm",
    input: "font-medium",
    left: "text-muted-foreground",
  }}
/>
```

### Level 4 — raw CSS

Target `.apna-input-field`, `.apna-otp-slot`, etc.

### Level 5 — dark theme

```html
<div data-apna-input-theme="dark">
  <ApnaInput />
  <ApnaOtpInput length={6} />
</div>
```

## Exported utilities

```ts
import {
  apnaInputFormatPresets,
  sanitizeApnaInputValue,
  getApnaInputValidationMessage,
  sanitizeIndianPhone,
  defaultClassNames,
  mergeClassNames,
} from "@alsocoder/apna-input"
```

## Playground

```bash
cd playground
npm install
npm run dev
```

## License

MIT
