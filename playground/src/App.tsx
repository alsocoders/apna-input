import { useState } from "react"
import {
  ApnaInput,
  ApnaOtpInput,
  ApnaTextarea,
} from "@alsocoder/apna-input"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3 rounded-xl border border-input bg-card p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
          <line x1="2" x2="22" y1="2" y2="22" />
        </>
      )}
    </svg>
  )
}

export default function App() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [notes, setNotes] = useState("")
  const [otp6, setOtp6] = useState("")
  const [otp4, setOtp4] = useState("")
  const [otpGrouped, setOtpGrouped] = useState("")
  const [otpMasked, setOtpMasked] = useState("")
  const [otpInvalid, setOtpInvalid] = useState("")
  const demoCorrectOtp = "123456"
  const otpInvalidError =
    otpInvalid.length === 6 && otpInvalid !== demoCorrectOtp
  const otpInvalidSuccess =
    otpInvalid.length === 6 && otpInvalid === demoCorrectOtp
  const [completedOtp, setCompletedOtp] = useState("")

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">@alsocoder/apna-input</h1>
        <p className="text-sm text-muted-foreground">
          Playground for input, textarea, OTP, formats, and theming.
        </p>
      </header>

      <Section title="Basic text input">
        <ApnaInput
          placeholder="Enter your name"
          value={name}
          onValueChange={setName}
        />
        <p className="text-sm text-muted-foreground">Value: {name || "empty"}</p>
      </Section>

      <Section title="Label + required">
        <ApnaInput
          label="Full name"
          required
          placeholder="John Doe"
        />
      </Section>

      <Section title="Phone India (+91 prefix)">
        <ApnaInput
          format="phone-india"
          left="+91"
          placeholder="Mobile number"
          value={phone}
          onValueChange={setPhone}
        />
        <p className="text-sm text-muted-foreground">Value: {phone || "empty"}</p>
      </Section>

      <Section title="Email format">
        <ApnaInput
          format="email"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onValueChange={setEmail}
        />
      </Section>

      <Section title="Password toggle">
        <ApnaInput
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter password"
          value={password}
          onValueChange={setPassword}
          right={{
            icon: <EyeIcon open={showPassword} />,
            onClick: () => setShowPassword((current) => !current),
            ariaLabel: showPassword ? "Hide password" : "Show password",
          }}
        />
      </Section>

      <Section title="Digits only">
        <ApnaInput format="digits" placeholder="Numbers only" />
      </Section>

      <Section title="Textarea">
        <ApnaTextarea
          label="Notes"
          rows={3}
          placeholder="Write something..."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </Section>

      <Section title="OTP — 6 digits">
        <ApnaOtpInput
          length={6}
          label="Verification code"
          value={otp6}
          onValueChange={setOtp6}
          onComplete={(code) => setCompletedOtp(code)}
        />
        <p className="text-sm text-muted-foreground">
          Value: {otp6 || "empty"}
          {completedOtp ? ` · Completed: ${completedOtp}` : ""}
        </p>
      </Section>

      <Section title="OTP — 4 digit PIN">
        <ApnaOtpInput length={4} value={otp4} onValueChange={setOtp4} />
      </Section>

      <Section title="OTP — grouped 3 + 3">
        <ApnaOtpInput
          length={6}
          groups={[3, 3]}
          value={otpGrouped}
          onValueChange={setOtpGrouped}
        />
      </Section>

      <Section title="OTP — masked">
        <ApnaOtpInput
          length={6}
          mask
          value={otpMasked}
          onValueChange={setOtpMasked}
        />
      </Section>

      <Section title="OTP — invalid state">
        <ApnaOtpInput
          length={6}
          invalid={otpInvalidError}
          invalidMessage="Invalid code. Please try again."
          value={otpInvalid}
          onValueChange={setOtpInvalid}
        />
        <p className="text-sm text-muted-foreground">
          Demo correct OTP: <span className="font-mono font-medium">{demoCorrectOtp}</span>
          {otpInvalidSuccess ? (
            <span className="text-green-600"> · Verified!</span>
          ) : null}
        </p>
      </Section>

      <Section title="Disabled">
        <ApnaInput disabled placeholder="Disabled input" defaultValue="Cannot edit" />
        <ApnaOtpInput length={6} disabled defaultValue="123456" />
      </Section>

      <Section title="CSS variables theme">
        <div className="demo-custom-apna-input-theme space-y-3">
          <ApnaInput placeholder="Custom blue theme" />
          <ApnaOtpInput length={6} groups={[3, 3]} />
        </div>
      </Section>

      <Section title="classNames Tailwind override">
        <ApnaInput
          placeholder="Rounded shadow input"
          classNames={{
            field: "rounded-xl shadow-sm",
            input: "font-medium",
          }}
        />
      </Section>

      <Section title="Dark theme">
        <div
          className="demo-dark-theme rounded-xl p-4"
          data-apna-input-theme="dark"
        >
          <ApnaInput placeholder="Dark themed input" />
          <div className="mt-3">
            <ApnaOtpInput length={6} groups={[3, 3]} />
          </div>
        </div>
      </Section>
    </main>
  )
}
