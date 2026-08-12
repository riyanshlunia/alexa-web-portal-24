import Image from "next/image";
import Link from "next/link";

const FORMULA_FONT =
  "var(--font-formula1), var(--font-montserrat-alternates), sans-serif";

export default function Recruitment26SuccessPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 rounded-[32px] border border-white/10 bg-[#111111] p-6 shadow-[0_0_40px_rgba(195,35,37,0.2)] md:p-10">
        <div className="text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#C32325]"
            style={{ fontFamily: FORMULA_FONT }}
          >
            Registration Successful
          </p>
          <h1
            className="text-3xl font-black md:text-5xl"
            style={{ fontFamily: FORMULA_FONT }}
          >
            You&apos;re in!
          </h1>
        </div>

        <div className="max-w-2xl text-center">
          <h2
            className="mb-3 text-2xl font-bold text-white md:text-3xl"
            style={{ fontFamily: FORMULA_FONT }}
          >
            Join the WhatsApp group
          </h2>
          <p
            className="text-base text-white/75 md:text-lg"
            style={{ fontFamily: FORMULA_FONT }}
          >
            Scan the QR code below or use the link to join the registered
            members WhatsApp group.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#C32325]/60 bg-[#1a1a1a] p-4 md:p-6">
          <Image
            src="/recruitments26/whatsapp-gc-qr.jpg"
            alt="WhatsApp group QR code"
            width={360}
            height={360}
            className="h-auto w-full max-w-[320px] rounded-2xl bg-white p-2"
            priority
          />
        </div>

        <div className="max-w-2xl text-center">
          <p
            className="mb-2 text-sm text-white/75 md:text-base"
            style={{ fontFamily: FORMULA_FONT }}
          >
            Or click this link to join directly:
          </p>
          <a
            href="https://chat.whatsapp.com/KLZPw242JZG2EjUmga3uu6?s=sh&p=i&ilr=0&amv=2"
            target="_blank"
            rel="noreferrer"
            className="break-words text-base font-semibold text-[#C32325] hover:text-white"
            style={{ fontFamily: FORMULA_FONT }}
          >
            https://chat.whatsapp.com/KLZPw242JZG2EjUmga3uu6?s=sh&p=i&ilr=0&amv=2
          </a>
        </div>

        <Link
          href="/recruitments26"
          className="inline-flex items-center justify-center rounded-full bg-[#C32325] px-7 py-3 text-base font-bold text-white transition-transform hover:scale-[1.02]"
          style={{ fontFamily: FORMULA_FONT }}
        >
          Back to recruitment page
        </Link>
      </div>
    </main>
  );
}
