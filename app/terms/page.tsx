import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Neatlogs",
  description: "The terms governing your use of the Neatlogs platform.",
};

export default function TermsPage() {
  return (
    <main className="page-reveal min-h-screen w-full bg-[#FAFAFA] pt-24 pb-24 sm:pt-28 lg:pt-32">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Link
          href="/"
          className="font-ui inline-flex items-center gap-1.5 text-[14px] font-medium text-zinc-600 transition-[color,transform] duration-150 ease-out hover:text-zinc-950 active:scale-[0.97] motion-reduce:active:scale-100"
        >
          ← Back to home
        </Link>

        <h1 className="mt-10 text-balance text-4xl font-semibold leading-[1.04] tracking-tighter text-zinc-950 sm:text-5xl">
          Terms of Service
        </h1>
        <p className="font-ui mt-4 text-[14px] text-zinc-500 sm:text-[15px]">
          Last updated: June 28, 2025
        </p>

        <div className="font-ui mt-12 space-y-10 text-[15px] leading-relaxed text-zinc-700 sm:text-base">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the Neatlogs platform operated by Neatlogs
              Pvt Limited, you agree to be bound by these Terms of Service. If
              you are using the service on behalf of an organization, you
              represent that you have the authority to bind that organization
              to these Terms.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              Neatlogs is an AI agent debugging and observability platform
              providing trace analysis, advanced filtering, collaborative trace
              viewing, team management, task management, and AI-assisted
              debugging tools.
            </p>
          </Section>

          <Section title="3. Account Responsibilities">
            <ul className="list-disc space-y-2 pl-5 marker:text-zinc-400">
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>You are responsible for all activities under your account.</li>
              <li>Notify us immediately of any unauthorized use.</li>
              <li>
                Ensure organization members comply with these Terms.
              </li>
            </ul>
          </Section>

          <Section title="4. Acceptable Use">
            <p>
              You shall not: violate any applicable law; reverse engineer the
              platform; interfere with service integrity; gain unauthorized
              access; transmit malicious code; or resell the service without
              prior written consent.
            </p>
          </Section>

          <Section title="5. Your Data">
            <p>
              You retain all ownership rights to your data. By using the
              service, you grant us a limited, non-exclusive license to
              process, store, and display your data solely for providing and
              improving the service. We handle your data in accordance with
              our Privacy Policy.
            </p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              The Neatlogs platform and all related intellectual property is
              owned by Neatlogs Pvt Limited. If you provide feedback or
              suggestions, you grant us an unrestricted, perpetual license to
              use such feedback.
            </p>
          </Section>

          <Section title="7. Payment and Billing">
            <p>
              Certain features require a paid subscription. All fees are
              exclusive of taxes unless stated otherwise. We may change pricing
              with 30 days&rsquo; notice. Contact{" "}
              <a
                href="mailto:hello@neatlogs.com"
                className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-950"
              >
                hello@neatlogs.com
              </a>{" "}
              for refund requests.
            </p>
          </Section>

          <Section title="8. Service Availability">
            <p>
              We strive for high availability but do not guarantee
              uninterrupted operation. We may perform scheduled maintenance
              with reasonable notice.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              The platform is provided &ldquo;as is&rdquo; without warranties.
              We disclaim all implied warranties. Our total aggregate liability
              shall not exceed the amount you paid us in the 12 months
              preceding the claim.
            </p>
          </Section>

          <Section title="10. Termination">
            <p>
              Either party may terminate at any time. Upon termination, we
              retain your data for 30 days to allow export, after which it will
              be deleted. Sections on IP, liability, and governing law survive
              termination.
            </p>
          </Section>

          <Section title="11. Governing Law">
            <p>
              These Terms are governed by the laws of India. Disputes shall be
              subject to the exclusive jurisdiction of the courts in New Delhi,
              India.
            </p>
          </Section>

          <Section title="12. Changes to These Terms">
            <p>
              We may update these Terms from time to time. Material changes
              will be posted on our website with an updated date.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>Neatlogs Pvt Limited</p>
            <p>New Delhi, India</p>
            <p>
              Email:{" "}
              <a
                href="mailto:hello@neatlogs.com"
                className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-950"
              >
                hello@neatlogs.com
              </a>
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-[20px] font-semibold tracking-tight text-zinc-950 sm:text-[22px]">
        {title}
      </h2>
      {children}
    </section>
  );
}
