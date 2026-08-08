"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const CANVAS_WIDTH = 1440
const CANVAS_HEIGHT = 1929

const ACCENT_RED = "#C32325"
const FONT_FAMILY = "'Formula1', var(--font-montserrat-alternates), sans-serif"

const BG_WIDTH = 1440
const BG_HEIGHT = 2251

const TITLE = {
  left: 389,
  top: 255,
  width: 662,
  height: 36,
  fontSize: 64,
}

const DOMAIN_OPTIONS = ["Technical", "Creatives", "Events", "Business"]

const DOMAIN_GROUPS = [
  { id: "firstDomain", label: "Choose Your First Domain", left: 243, top: 1010, width: 986, height: 266 },
  { id: "secondDomain", label: "Choose Your Second Domain", left: 235, top: 1362, width: 986, height: 266 },
] as const

const SUBMIT_BUTTON = { left: 500, top: 1713, width: 427, height: 116 }

const MOBILE_CANVAS_WIDTH = 393
const MOBILE_CANVAS_HEIGHT = 1623

const MOBILE_FIELD_BOX: Record<FieldId, { left: number; top: number; width: number; height: number }> = {
  name: { left: 43, top: 286, width: 307.0776, height: 73.8511 },
  registerNumber: { left: 43, top: 380.43, width: 307.0776, height: 76.4266 },
  phone: { left: 43, top: 477.43, width: 307.0776, height: 73.8502 },
  srmistEmail: { left: 43, top: 571.86, width: 307.0776, height: 78.1439 },
  github: { left: 43, top: 670.86, width: 307.0776, height: 78.1439 },
  linkedin: { left: 43, top: 769.86, width: 307.0776, height: 78.1439 },
}

const MOBILE_DOMAIN_GROUPS = [
  { id: "firstDomain", label: "Choose Your First Domain", left: 28, top: 904, width: 338, height: 241.3786 },
  { id: "secondDomain", label: "Choose Your Second Domain", left: 15, top: 1198, width: 363, height: 242.3786 },
] as const

// The submit-button numbers you sent were identical to the second-domain box (a paste mix-up), so this is
// a placeholder position/size until the real ones come through — flagged in the summary, not silently guessed.
const MOBILE_SUBMIT_BUTTON = { left: 86.5, top: 1493, width: 220, height: 70 }

type FieldId = "name" | "registerNumber" | "phone" | "srmistEmail" | "github" | "linkedin"

const FIELDS: {
  id: FieldId
  label: string
  required: boolean
  type: string
  placeholder: string
  left: number
  top: number
  width: number
  height: number
  countryCode?: string
}[] = [
  { id: "name", label: "Name*", required: true, type: "text", placeholder: "Name", left: 67, top: 366.01, width: 596.9625, height: 143.5675 },
  { id: "registerNumber", label: "Register Number*", required: true, type: "text", placeholder: "RA0123456789012", left: 769.04, top: 361, width: 596.9625, height: 148.5742 },
  { id: "phone", label: "Phone Number*", required: true, type: "tel", placeholder: "012 345 6789", left: 72.01, top: 556.32, width: 596.9625, height: 143.5658, countryCode: "+91" },
  { id: "srmistEmail", label: "SRMIST Email*", required: true, type: "email", placeholder: "xyz@srmist.edu.in", left: 769.04, top: 547.97, width: 596.9625, height: 151.9127 },
  { id: "github", label: "Github Profile Link", required: false, type: "text", placeholder: "Optional unless Technical is chosen", left: 72.01, top: 746, width: 596.9625, height: 143.8815 },
  { id: "linkedin", label: "LinkedIn Profile Link*", required: true, type: "text", placeholder: "https://linkedin.com/in/username", left: 769.04, top: 737.97, width: 596.9625, height: 151.9127 },
]

type FormData = Record<FieldId, string> & { firstDomain: string; secondDomain: string }

const INITIAL_FORM_DATA: FormData = {
  name: "",
  registerNumber: "",
  phone: "",
  srmistEmail: "",
  github: "",
  linkedin: "",
  firstDomain: "",
  secondDomain: "",
}

function validateField(id: FieldId, value: string, required: boolean): string {
  if (!value.trim()) return required ? "This field is required." : ""
  if (id === "name" && !/^[A-Za-z ]+$/.test(value.trim())) return "Name can only contain letters."
  if (id === "registerNumber" && !/^RA\d{13}$/.test(value.trim())) {
    return "Must start with RA followed by 13 digits (15 characters total)."
  }
  if (id === "phone" && !/^\d{10}$/.test(value.trim())) return "Enter a valid 10-digit phone number."
  if (id === "srmistEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address."
  return ""
}

function FieldBox({
  field,
  label,
  value,
  error,
  onChange,
}: {
  field: (typeof FIELDS)[number]
  label: string
  value: string
  error: string
  onChange: (value: string) => void
}) {
  return (
    <div className="absolute" style={{ left: field.left, top: field.top, width: field.width }}>
      <label
        className="block font-extrabold mb-3"
        style={{ color: ACCENT_RED, fontFamily: FONT_FAMILY, fontSize: 40, lineHeight: "46.74px", letterSpacing: "0.33px" }}
      >
        {label}
      </label>
      <div
        className="flex items-stretch overflow-hidden rounded-2xl"
        style={{
          backgroundColor: "#5D5D5D",
          borderWidth: "3px",
          borderStyle: "solid",
          borderImage: "linear-gradient(90deg, #757373 0%, #FFFFFF 100%) 1",
        }}
      >
        {field.countryCode && (
          <span
            className="flex items-center px-4 font-normal text-white/70 border-r border-white/10"
            style={{ fontFamily: FONT_FAMILY, fontSize: 18 }}
          >
            {field.countryCode}
          </span>
        )}
        <input
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full bg-transparent px-5 py-4 font-normal text-white placeholder-white outline-none"
          style={{ fontFamily: FONT_FAMILY, fontSize: 28, lineHeight: "26.71px", letterSpacing: "0.17px" }}
        />
      </div>
      {error && (
        <p className="mt-2 font-normal" style={{ color: ACCENT_RED, fontFamily: FONT_FAMILY, fontSize: 14 }}>
          {error}
        </p>
      )}
    </div>
  )
}

function DomainOption({
  label,
  selected,
  onSelect,
}: {
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button type="button" onClick={onSelect} className="flex items-center gap-3">
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border-2"
        style={{ borderColor: "#918C8C" }}
      >
        {selected && <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: ACCENT_RED }} />}
      </span>
      <span className="font-extrabold text-white" style={{ fontFamily: FONT_FAMILY, fontSize: 20 }}>
        {label}
      </span>
    </button>
  )
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<Partial<Record<FieldId | "domains", string>>>({})
  const [submitted, setSubmitted] = useState(false)

  // GitHub is only required when either domain choice is Technical — every other field is always required.
  const githubRequired = formData.firstDomain === "Technical" || formData.secondDomain === "Technical"
  const isRequired = (field: (typeof FIELDS)[number]) => (field.id === "github" ? githubRequired : field.required)
  const fieldLabel = (field: (typeof FIELDS)[number]) =>
    field.id === "github" ? `Github Profile Link${githubRequired ? "*" : ""}` : field.label

  const setFieldValue = (id: FieldId, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const selectDomain = (group: "firstDomain" | "secondDomain", value: string) => {
    setFormData((prev) => ({ ...prev, [group]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: Partial<Record<FieldId | "domains", string>> = {}
    for (const field of FIELDS) {
      const message = validateField(field.id, formData[field.id], isRequired(field))
      if (message) nextErrors[field.id] = message
    }
    if (!formData.firstDomain || !formData.secondDomain) {
      nextErrors.domains = "Please select both a first and second domain."
    } else if (formData.firstDomain === formData.secondDomain) {
      nextErrors.domains = "First and second domain must be different."
    }

    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  return (
    <section className="relative w-full bg-black">
      <style>{`
        @font-face {
          font-family: 'Formula1';
          src: url('/recruitments26/Formula1-Regular.ttf') format('truetype');
          font-weight: 100 499;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Formula1';
          src: url('/recruitments26/Formula1-Bold.ttf') format('truetype');
          font-weight: 500 900;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      {/* Mobile layout — pixel-mapped from Figma, scaled responsively via container query units */}
      <div className="lg:hidden relative z-10">
        <div
          className="relative w-full mx-auto overflow-hidden"
          style={{ containerType: "inline-size", aspectRatio: `${MOBILE_CANVAS_WIDTH} / ${MOBILE_CANVAS_HEIGHT}` }}
        >
          <form
            onSubmit={handleSubmit}
            className="absolute top-0 left-0 bg-black"
            style={{
              width: MOBILE_CANVAS_WIDTH,
              height: MOBILE_CANVAS_HEIGHT,
              transform: `scale(calc(100cqw / ${MOBILE_CANVAS_WIDTH}px))`,
              transformOrigin: "top left",
            }}
          >
            <Image
              src="/recruitments26/image32645-mobile.svg"
              alt=""
              width={393}
              height={572}
              unoptimized
              priority
              className="absolute z-0 top-0 left-0 pointer-events-none select-none"
            />

            <h1
              className="absolute z-10 w-full text-center font-extrabold"
              style={{ top: 90, color: ACCENT_RED, fontFamily: FONT_FAMILY, fontSize: 32, letterSpacing: 0.1 }}
            >
              Registration Form
            </h1>

            {FIELDS.map((field) => {
              const box = MOBILE_FIELD_BOX[field.id]
              return (
                <div key={field.id} className="absolute z-10" style={{ left: box.left, top: box.top, width: box.width }}>
                  <label
                    className="block font-extrabold mb-1.5"
                    style={{ color: ACCENT_RED, fontFamily: FONT_FAMILY, fontSize: 15 }}
                  >
                    {fieldLabel(field)}
                  </label>
                  <div
                    className="flex items-stretch overflow-hidden"
                    style={{
                      backgroundColor: "#5D5D5D",
                      borderWidth: "3px",
                      borderStyle: "solid",
                      borderImage: "linear-gradient(90deg, #757373 0%, #FFFFFF 100%) 1",
                      borderRadius: "8.59px",
                    }}
                  >
                    {field.countryCode && (
                      <span className="flex items-center px-3 text-white/70" style={{ fontFamily: FONT_FAMILY, fontSize: 14 }}>
                        {field.countryCode}
                      </span>
                    )}
                    <input
                      type={field.type}
                      value={formData[field.id]}
                      onChange={(e) => setFieldValue(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent px-3 py-2.5 text-white placeholder-white outline-none"
                      style={{ fontFamily: FONT_FAMILY, fontSize: 14 }}
                    />
                  </div>
                  {errors[field.id] && (
                    <p className="mt-1" style={{ color: ACCENT_RED, fontFamily: FONT_FAMILY, fontSize: 11 }}>
                      {errors[field.id]}
                    </p>
                  )}
                </div>
              )
            })}

            {MOBILE_DOMAIN_GROUPS.map((group) => (
              <div key={group.id} className="absolute z-10" style={{ left: group.left, top: group.top, width: group.width, height: group.height }}>
                <h2
                  className="mb-5 text-center font-extrabold text-white"
                  style={{ fontFamily: FONT_FAMILY, fontSize: 18 }}
                >
                  {group.label}
                </h2>
                <div className="flex w-fit mx-auto flex-col items-start gap-4">
                  {DOMAIN_OPTIONS.map((option) => (
                    <DomainOption
                      key={option}
                      label={option}
                      selected={formData[group.id] === option}
                      onSelect={() => selectDomain(group.id, option)}
                    />
                  ))}
                </div>
              </div>
            ))}
            {errors.domains && (
              <p
                className="absolute z-10 w-full text-center"
                style={{
                  top: MOBILE_DOMAIN_GROUPS[1].top + MOBILE_DOMAIN_GROUPS[1].height + 12,
                  color: ACCENT_RED,
                  fontFamily: FONT_FAMILY,
                  fontSize: 13,
                }}
              >
                {errors.domains}
              </p>
            )}

            <button
              type="submit"
              className="absolute z-10 flex items-center justify-center gap-2 rounded-full border-2 font-extrabold text-white"
              style={{
                left: MOBILE_SUBMIT_BUTTON.left,
                top: MOBILE_SUBMIT_BUTTON.top,
                width: MOBILE_SUBMIT_BUTTON.width,
                height: MOBILE_SUBMIT_BUTTON.height,
                backgroundColor: ACCENT_RED,
                borderColor: "#FFFFFF",
                fontFamily: FONT_FAMILY,
                fontSize: 16,
              }}
            >
              Register <ArrowRight size={18} />
            </button>

            {submitted && (
              <p
                className="absolute z-10 w-full text-center"
                style={{
                  top: MOBILE_SUBMIT_BUTTON.top + MOBILE_SUBMIT_BUTTON.height + 16,
                  color: "#FFFFFF",
                  fontFamily: FONT_FAMILY,
                  fontSize: 13,
                }}
              >
                Form validated successfully.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Desktop layout — pixel-mapped from Figma, scaled responsively via container query units */}
      <div className="hidden lg:block relative z-10">
        <div
          className="relative w-full max-w-360 mx-auto overflow-hidden"
          style={{ containerType: "inline-size", aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
        >
          <form
            onSubmit={handleSubmit}
            className="absolute top-0 left-0"
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              transform: "scale(calc(100cqw / 1440px))",
              transformOrigin: "top left",
            }}
          >
            <Image
              src="/recruitments26/image32645.svg"
              alt=""
              width={BG_WIDTH}
              height={BG_HEIGHT}
              unoptimized
              priority
              className="absolute z-0 pointer-events-none select-none"
              style={{ left: 0, top: 0 }}
            />

            <h1
              className="absolute z-10 font-extrabold whitespace-nowrap"
              style={{
                left: TITLE.left,
                top: TITLE.top,
                width: TITLE.width,
                height: TITLE.height,
                fontSize: TITLE.fontSize,
                lineHeight: "36px",
                letterSpacing: 0.1,
                textAlign: "center",
                fontFamily: FONT_FAMILY,
                color: ACCENT_RED,
              }}
            >
              Registration Form
            </h1>

            {FIELDS.map((field) => (
              <FieldBox
                key={field.id}
                field={field}
                label={fieldLabel(field)}
                value={formData[field.id]}
                error={errors[field.id] ?? ""}
                onChange={(value) => setFieldValue(field.id, value)}
              />
            ))}

            {DOMAIN_GROUPS.map((group) => (
              <div key={group.id} className="absolute z-10" style={{ left: group.left, top: group.top, width: group.width, height: group.height }}>
                <h2
                  className="mb-10 text-center font-extrabold text-white"
                  style={{ fontFamily: FONT_FAMILY, fontSize: 44, lineHeight: "46.74px", letterSpacing: "0.33px" }}
                >
                  {group.label}
                </h2>
                <div className="grid w-fit mx-auto grid-cols-2 gap-x-24 gap-y-8 justify-items-start">
                  {DOMAIN_OPTIONS.map((option) => (
                    <DomainOption
                      key={option}
                      label={option}
                      selected={formData[group.id] === option}
                      onSelect={() => selectDomain(group.id, option)}
                    />
                  ))}
                </div>
              </div>
            ))}
            {errors.domains && (
              <p
                className="absolute z-10 w-full text-center"
                style={{ top: DOMAIN_GROUPS[1].top + DOMAIN_GROUPS[1].height + 12, color: ACCENT_RED, fontFamily: FONT_FAMILY, fontSize: 16 }}
              >
                {errors.domains}
              </p>
            )}

            <button
              type="submit"
              className="absolute z-10 flex items-center justify-center gap-2.5 rounded-full border-2 font-extrabold text-white"
              style={{
                left: SUBMIT_BUTTON.left,
                top: SUBMIT_BUTTON.top,
                width: SUBMIT_BUTTON.width,
                height: SUBMIT_BUTTON.height,
                backgroundColor: ACCENT_RED,
                borderColor: "#FFFFFF",
                fontFamily: FONT_FAMILY,
                fontSize: 24,
              }}
            >
              Submit <ArrowRight size={24} />
            </button>

            {submitted && (
              <p
                className="absolute z-10 w-full text-center"
                style={{ top: SUBMIT_BUTTON.top + SUBMIT_BUTTON.height + 20, color: "#FFFFFF", fontFamily: FONT_FAMILY, fontSize: 18 }}
              >
                Form validated successfully.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
