"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerRecruitment26 } from "@/app/actions/registerRecruitments26";

type FieldId =
  | "name"
  | "registrationNumber"
  | "phoneNumber"
  | "srmistEmail"
  | "githubProfile"
  | "linkedinProfile";

type FormData = {
  name: string;
  registrationNumber: string;
  phoneNumber: string;
  srmistEmail: string;
  githubProfile: string;
  linkedinProfile: string;
  firstDomain: string;
  secondDomain: string;
};

type FormErrors = Partial<Record<FieldId | "domains", string>>;

type SubmissionStatus =
  | "success"
  | "duplicate"
  | "serverError"
  | null;

type DomainOptionProps = {
  name: "firstDomain" | "secondDomain";
  value: string;
  selectedValue: string;
  onChange: (
    domainType: "firstDomain" | "secondDomain",
    value: string
  ) => void;
  label: string;
};

const ACCENT_RED = "#C32325";

const FONT_FAMILY =
  "var(--font-formula1), var(--font-montserrat-alternates), sans-serif";

const DOMAIN_OPTIONS = [
  "Technical",
  "Creatives",
  "Events",
  "Business",
];

const INITIAL_FORM_DATA: FormData = {
  name: "",
  registrationNumber: "",
  phoneNumber: "",
  srmistEmail: "",
  githubProfile: "",
  linkedinProfile: "",
  firstDomain: "",
  secondDomain: "",
};

function validateField(
  id: FieldId,
  value: string,
  required: boolean
): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return required ? "This field is required." : "";
  }

  if (id === "name") {
    if (!/^[A-Za-z ]+$/.test(trimmedValue)) {
      return "Name can only contain letters.";
    }
  }

  if (id === "registrationNumber") {
    if (!/^RA\d{13}$/.test(trimmedValue)) {
      return "Must start with RA followed by 13 digits.";
    }
  }

  if (id === "phoneNumber") {
    if (!/^\d{10}$/.test(trimmedValue)) {
      return "Enter a valid 10-digit phone number.";
    }
  }

  if (id === "srmistEmail") {
    if (!/^[a-zA-Z]{2}\d{4}@srmist\.edu\.in$/.test(trimmedValue)) {
      return "Please enter a valid SRMIST email address.";
    }
  }

  if (id === "githubProfile") {
    if (
      !/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/.test(
        trimmedValue
      )
    ) {
      return "Enter a valid GitHub profile link.";
    }
  }

  if (id === "linkedinProfile") {
    if (
      !/^(https?:\/\/)?(www\.)?linkedin\.com\/(?:in\/)?[A-Za-z0-9-]+\/?$/.test(
        trimmedValue
      )
    ) {
      return "Enter a valid LinkedIn profile link.";
    }
  }

  return "";
}

const inputWrapperStyle = {
  backgroundColor: "#5D5D5D",
  border: "2px solid #FFFFFF",
};

function FieldBox({
  field,
  label,
  value,
  error,
  onChange,
}: {
  field: {
    id: FieldId;
    label: string;
    required: boolean;
    type: string;
    placeholder: string;
    countryCode?: string;
  };
  label: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={field.id}
        className="block font-extrabold mb-3"
        style={{
          color: ACCENT_RED,
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          lineHeight: "1.15",
          letterSpacing: "0.33px",
        }}
      >
        {label}
      </label>

      <div
        className="flex items-stretch overflow-hidden rounded-2xl"
        style={inputWrapperStyle}
      >
        {field.countryCode && (
          <span
            className="flex items-center px-4 font-normal text-white/70 border-r border-white/10"
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
            }}
          >
            {field.countryCode}
          </span>
        )}

        <input
          id={field.id}
          name={field.id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full bg-transparent px-5 py-4 font-normal text-white outline-none"
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 18,
            lineHeight: "1.2",
            letterSpacing: "0.17px",
          }}
        />
      </div>

      {error && (
        <p
          data-form-error="true"
          className="mt-2 font-normal"
          style={{
            color: ACCENT_RED,
            fontFamily: FONT_FAMILY,
            fontSize: 14,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function DomainOption({
  name,
  value,
  selectedValue,
  onChange,
  label,
}: DomainOptionProps) {
  const selected = selectedValue === value;

  return (
    <button
      type="button"
      onClick={() => onChange(name, value)}
      className="flex items-center gap-3"
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border-2"
        style={{
          borderColor: selected ? ACCENT_RED : "#918C8C",
        }}
      >
        {selected && (
          <span
            className="h-3.5 w-3.5 rounded-full"
            style={{
              backgroundColor: ACCENT_RED,
            }}
          />
        )}
      </span>

      <span
        className="font-extrabold text-white"
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 18,
        }}
      >
        {label}
      </span>
    </button>
  );
}

const FIELDS: {
  id: FieldId;
  label: string;
  required: boolean;
  type: string;
  placeholder: string;
  countryCode?: string;
}[] = [
  {
    id: "name",
    label: "Name*",
    required: true,
    type: "text",
    placeholder: "Name",
  },
  {
    id: "registrationNumber",
    label: "Register Number*",
    required: true,
    type: "text",
    placeholder: "RAXXXXXXXXXXXXX",
  },
  {
    id: "phoneNumber",
    label: "Phone Number*",
    required: true,
    type: "tel",
    placeholder: "012 345 6789",
    countryCode: "+91",
  },
  {
    id: "srmistEmail",
    label: "SRMIST Email*",
    required: true,
    type: "email",
    placeholder: "ab1234@srmist.edu.in",
  },
  {
    id: "githubProfile",
    label: "Github Profile Link",
    required: false,
    type: "text",
    placeholder: "Optional",
  },
  {
    id: "linkedinProfile",
    label: "LinkedIn Profile Link",
    required: false,
    type: "text",
    placeholder: "Optional",
  },
];

export default function RegistrationForm() {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [formData, setFormData] =
    useState<FormData>(INITIAL_FORM_DATA);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [showErrorPopup, setShowErrorPopup] =
    useState(false);

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const githubRequired =
    formData.firstDomain === "Technical" ||
    formData.secondDomain === "Technical";

  const isRequired = (
    field: (typeof FIELDS)[number]
  ) => {
    if (field.id === "githubProfile") {
      return githubRequired;
    }

    return field.required;
  };

  const fieldLabel = (
    field: (typeof FIELDS)[number]
  ) => {
    if (field.id === "githubProfile") {
      return githubRequired
        ? "Github Profile Link*"
        : "Github Profile Link";
    }

    return field.label;
  };

  const setFieldValue = (
    id: FieldId,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));

    setSubmissionStatus(null);
  };

  const handleFieldChange = (
    id: FieldId,
    value: string
  ) => {
    if (id === "phoneNumber") {
      const numericValue = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setFieldValue(id, numericValue);
      return;
    }

    if (id === "registrationNumber") {
      const upperValue = value.toUpperCase();

      const regex = /^(?:R|RA\d{0,13})?$/;

      if (regex.test(upperValue)) {
        setFieldValue(id, upperValue);
      }

      return;
    }

    setFieldValue(id, value);
  };

  const handleDomainChange = (
    domainType:
      | "firstDomain"
      | "secondDomain",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [domainType]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      domains: "",
      githubProfile: "",
    }));

    setSubmissionStatus(null);
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    for (const field of FIELDS) {
      const message = validateField(
        field.id,
        formData[field.id],
        isRequired(field)
      );

      if (message) {
        if (
          field.id === "githubProfile" &&
          githubRequired &&
          !formData.githubProfile.trim()
        ) {
          nextErrors.githubProfile =
            "GitHub profile is compulsory when Technical is selected as a domain.";
        } else {
          nextErrors[field.id] = message;
        }
      }
    }

    if (
      !formData.firstDomain ||
      !formData.secondDomain
    ) {
      nextErrors.domains =
        "Please select both a first and second domain.";
    } else if (
      formData.firstDomain ===
      formData.secondDomain
    ) {
      nextErrors.domains =
        "First and second domain must be different.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSubmissionStatus(null);

    const isValid = validateForm();

    if (!isValid) {
      setShowErrorPopup(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerRecruitment26({
        name: formData.name,
        registrationNumber: formData.registrationNumber,
        phoneNumber: formData.phoneNumber,
        srmistEmail: formData.srmistEmail,
        githubProfile: formData.githubProfile,
        linkedinProfile: formData.linkedinProfile,
        firstDomain: formData.firstDomain,
        secondDomain: formData.secondDomain,
      });

      if (result.success) {
        setSubmissionStatus("success");
        setFormData(INITIAL_FORM_DATA);
        setErrors({});

        setTimeout(() => {
          router.push("/recruitments26");
        }, 2000);
      } else if ((result as { duplicate?: boolean }).duplicate) {
        setSubmissionStatus("duplicate");
      } else {
        setSubmissionStatus("serverError");
      }
    } catch {
      setSubmissionStatus("serverError");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeStatus = () => {
    setSubmissionStatus(null);
  };

  return (
    <section
  className="registration-section relative w-full"
  style={{
    backgroundImage: "url('/recruitments26/image32645.svg')",
    backgroundSize: "100% auto",
    backgroundPosition: "center -340px",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#000",
  }}
>
      <style>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.60);
          opacity: 1;
        }

        .registration-section {
  background-position: center -340px !important;
}

@media (max-width: 767px) {
  .registration-section {
    background-position: center -120px !important;
  }
}
      `}</style>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-between px-8 py-16 lg:hidden"
          style={{
            background:
              "radial-gradient(ellipse at center, #6b0000 0%, #1a0000 50%, #000000 100%)",
          }}
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center"
          >
            <span className="absolute block h-[3px] w-8 rotate-45 rounded-full bg-white" />
            <span className="absolute block h-[3px] w-8 -rotate-45 rounded-full bg-white" />
          </button>

          <div className="flex flex-1 flex-col items-center justify-center gap-12">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push("/recruitments26#home");
              }}
              className="text-3xl font-bold tracking-wide text-white transition-colors hover:text-red-400"
            >
              Home
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push("/recruitments26#domain");
              }}
              className="text-3xl font-bold tracking-wide text-white transition-colors hover:text-red-400"
            >
              Domain
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push("/recruitments26#roadmap");
              }}
              className="text-3xl font-bold tracking-wide text-white transition-colors hover:text-red-400"
            >
              Roadmap
            </button>
          </div>

          <button
            className="w-full max-w-[260px] rounded-full bg-[#C32325] py-4 text-xl font-bold text-white shadow-[0_0_20px_rgba(195,35,37,0.5)] transition-all hover:scale-105 hover:bg-[#a01c1e] active:scale-95"
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push(
                "/recruitment26registerform"
              );
            }}
          >
            Register Now
          </button>
        </div>
      )}

      <nav className="relative z-50 flex w-full items-center justify-between px-4 py-4 sm:px-8 sm:py-6 md:px-12">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/recruitments26/Vector.svg"
            alt="Alexa Logo"
            width={32}
            height={32}
            className="h-6 w-6 sm:h-8 sm:w-8"
          />

          <span className="text-base font-medium tracking-wide text-white sm:text-lg">
            Alexa Developers SRM
          </span>
        </div>

        <div className="relative hidden h-[26px] w-[420px] lg:block xl:h-[32px] xl:w-[520px]">
          <Image
            src="/recruitments26/Nav buttons.svg"
            alt="Navigation links"
            fill
            className="object-contain"
          />

          <button
            onClick={() =>
              router.push("/recruitments26#home")
            }
            className="absolute left-0 top-0 h-full w-[12.5%] cursor-pointer"
            aria-label="Home"
          />

          <button
            onClick={() =>
              router.push("/recruitments26#domain")
            }
            className="absolute left-[19.8%] top-0 h-full w-[16.4%] cursor-pointer"
            aria-label="Domain"
          />

          <button
            onClick={() =>
              router.push("/recruitments26#roadmap")
            }
            className="absolute left-[43.1%] top-0 h-full w-[21.1%] cursor-pointer"
            aria-label="Roadmap"
          />

          <button
            onClick={() =>
              router.push(
                "/recruitment26registerform"
              )
            }
            className="absolute right-0 top-0 h-full w-[29.4%] cursor-pointer rounded-full transition-colors hover:bg-white/10"
            aria-label="Register Now"
          />
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="block h-[3px] w-7 rounded-full bg-white" />
          <span className="block h-[3px] w-7 rounded-full bg-white" />
          <span className="block h-[3px] w-7 rounded-full bg-white" />
        </button>
      </nav>

      {showErrorPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border-2 border-white bg-[#1c1c1c] p-8 text-center shadow-[0_0_40px_rgba(195,35,37,0.45)]">
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor: ACCENT_RED,
              }}
            >
              <span
                className="text-3xl font-bold text-white"
                style={{
                  fontFamily: FONT_FAMILY,
                }}
              >
                !
              </span>
            </div>

            <h2
              className="mb-4 font-extrabold text-white"
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 24,
              }}
            >
              Please check your form
            </h2>

            <p
              className="mb-7 text-white/80"
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 15,
                lineHeight: 1.5,
              }}
            >
              Some fields above need to be corrected
              before you can submit the form.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowErrorPopup(false);

                setTimeout(() => {
                  const firstError =
                    document.querySelector(
                      '[data-form-error="true"]'
                    );

                  firstError?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }, 100);
              }}
              className="w-full rounded-full border-2 border-white py-3 font-extrabold text-white transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: ACCENT_RED,
                fontFamily: FONT_FAMILY,
                fontSize: 17,
              }}
            >
              Review Fields
            </button>
          </div>
        </div>
      )}

      {submissionStatus && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border-2 border-white bg-[#1c1c1c] p-8 text-center shadow-[0_0_40px_rgba(195,35,37,0.45)]">
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  submissionStatus === "success"
                    ? "#168A45"
                    : ACCENT_RED,
              }}
            >
              <span
                className="text-3xl font-bold text-white"
                style={{
                  fontFamily: FONT_FAMILY,
                }}
              >
                {submissionStatus === "success"
                  ? "✓"
                  : "!"}
              </span>
            </div>

            <h2
              className="mb-4 font-extrabold text-white"
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 24,
              }}
            >
              {submissionStatus === "success" &&
                "Registration successful!"}

              {submissionStatus === "duplicate" &&
                "Registration already exists"}

              {submissionStatus === "serverError" &&
                "Something went wrong"}
            </h2>

            <p
              className="mb-7 text-white/80"
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 15,
                lineHeight: 1.5,
              }}
            >
              {submissionStatus === "success" &&
                "Your registration has been submitted successfully. Welcome to the journey!"}

              {submissionStatus === "duplicate" &&
                "A registration with these details already exists. Please check your details and try again."}

              {submissionStatus === "serverError" &&
                "We could not complete your registration right now. Please try again later."}
            </p>

            <button
              type="button"
              onClick={closeStatus}
              className="w-full rounded-full border-2 border-white py-3 font-extrabold text-white transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: ACCENT_RED,
                fontFamily: FONT_FAMILY,
                fontSize: 17,
              }}
            >
              {submissionStatus === "success"
                ? "Done"
                : "Try Again"}
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-6xl px-6 pt-5 pb-16 md:px-10 md:pt-16 lg:px-16"
      >
        <h1
          className="mb-16 text-center font-extrabold"
          style={{
            color: ACCENT_RED,
            fontFamily: FONT_FAMILY,
            fontSize:
              "clamp(36px, 5vw, 64px)",
            lineHeight: 1,
            letterSpacing: "0.1px",
          }}
        >
          Registration Form
        </h1>

        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
          {FIELDS.map((field) => (
            <FieldBox
              key={field.id}
              field={field}
              label={fieldLabel(field)}
              value={formData[field.id]}
              error={errors[field.id] ?? ""}
              onChange={(value) =>
                handleFieldChange(
                  field.id,
                  value
                )
              }
            />
          ))}
        </div>

        <div className="mt-16">
          <h2
            className="mb-10 text-center font-extrabold text-white"
            style={{
              fontFamily: FONT_FAMILY,
              fontSize:
                "clamp(24px, 3vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "0.33px",
            }}
          >
            Choose Your First Domain
          </h2>

          <div className="mx-auto grid w-fit grid-cols-1 gap-x-24 gap-y-7 sm:grid-cols-2">
            {DOMAIN_OPTIONS.map(
              (domain) => (
                <DomainOption
                  key={domain}
                  name="firstDomain"
                  value={domain}
                  selectedValue={
                    formData.firstDomain
                  }
                  onChange={
                    handleDomainChange
                  }
                  label={domain}
                />
              )
            )}
          </div>
        </div>

        <div className="mt-16">
          <h2
            className="mb-10 text-center font-extrabold text-white"
            style={{
              fontFamily: FONT_FAMILY,
              fontSize:
                "clamp(24px, 3vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "0.33px",
            }}
          >
            Choose Your Second Domain
          </h2>

          <div className="mx-auto grid w-fit grid-cols-1 gap-x-24 gap-y-7 sm:grid-cols-2">
            {DOMAIN_OPTIONS.map(
              (domain) => (
                <DomainOption
                  key={domain}
                  name="secondDomain"
                  value={domain}
                  selectedValue={
                    formData.secondDomain
                  }
                  onChange={
                    handleDomainChange
                  }
                  label={domain}
                />
              )
            )}
          </div>
        </div>

        {errors.domains && (
          <p
            data-form-error="true"
            className="mt-6 text-center font-normal"
            style={{
              color: ACCENT_RED,
              fontFamily: FONT_FAMILY,
              fontSize: 16,
            }}
          >
            {errors.domains}
          </p>
        )}

        <div className="mt-16 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center rounded-full border-2 font-extrabold text-white transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              width:
                "min(427px, 80vw)",
              height: 72,
              backgroundColor: ACCENT_RED,
              borderColor: "#FFFFFF",
              fontFamily: FONT_FAMILY,
              fontSize: 24,
            }}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit"}
          </button>
        </div>
      </form>
      <div
  className="mx-auto"
  style={{
    width: "calc(100% - 120px)",
    height: "3px",
    backgroundColor: "#C32325",
  }}
/>
    </section>
  );
}