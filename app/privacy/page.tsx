import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Neatlogs",
  description: "How Neatlogs collects, uses, and protects your information.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="font-ui mt-4 text-[14px] text-zinc-500 sm:text-[15px]">
          Last updated: June 28, 2025
        </p>

        <div className="font-ui mt-12 space-y-10 text-[15px] leading-relaxed text-zinc-700 sm:text-base">
          <Section title="1. Introduction">
            <p>
              Neatlogs Pvt Limited (&ldquo;Neatlogs,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;), incorporated in New Delhi,
              India, operates the Neatlogs platform—an AI agent debugging and
              observability service. This Privacy Policy explains how we collect,
              use, store, and protect your information when you use our website
              and services.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>
              <span className="font-medium text-zinc-900">
                Account Information:
              </span>{" "}
              Name, email address, organization name, and other details you
              provide during registration.
            </p>
            <p>
              <span className="font-medium text-zinc-900">Service Data:</span>{" "}
              Traces, logs, agent execution data, comments, and task information
              you send to or create within the platform.
            </p>
            <p>
              <span className="font-medium text-zinc-900">
                Automatically Collected Data:
              </span>{" "}
              IP address, browser type, device information, operating system,
              referring URLs, pages visited, and timestamps.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc space-y-2 pl-5 marker:text-zinc-400">
              <li>To operate, maintain, and improve the Neatlogs platform.</li>
              <li>
                To send account notifications, security alerts, and product
                updates.
              </li>
              <li>
                To understand usage patterns and improve features and
                performance.
              </li>
              <li>
                To detect, prevent, and address fraud, abuse, and security
                threats.
              </li>
              <li>
                To comply with applicable laws, regulations, and legal processes.
              </li>
            </ul>
          </Section>

          <Section title="4. Data Storage and Security">
            <p>
              Your data is hosted on Amazon Web Services (AWS) in the US West
              region. We implement industry-standard security measures including
              encryption in transit (TLS) and at rest, access controls, and
              regular security reviews.
            </p>
            <p>
              We retain your data for as long as your account is active. Upon
              account deletion, we will remove your personal data within 30
              days, except where retention is required by law.
            </p>
          </Section>

          <Section title="5. Sharing of Information">
            <p>We do not sell your personal data.</p>
            <p>
              We may share information with trusted service providers (hosting,
              analytics, email delivery), when required by law, in connection
              with business transfers, or with your explicit consent.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>
              Depending on your location, you may request access, correction,
              deletion, or export of your personal data. You may also opt out of
              marketing communications at any time. Contact us at{" "}
              <a
                href="mailto:hello@neatlogs.com"
                className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-950"
              >
                hello@neatlogs.com
              </a>{" "}
              to exercise these rights.
            </p>
          </Section>

          <Section title="7. Cookies and Tracking">
            <p>
              We use cookies and similar technologies to maintain your session,
              remember preferences, and understand how you interact with our
              platform. You can manage cookie preferences through your browser
              settings.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Neatlogs is not intended for individuals under 16. We do not
              knowingly collect personal data from children.
            </p>
          </Section>

          <Section title="9. Governing Law">
            <p>
              This Privacy Policy is governed by the laws of India, including
              the Information Technology Act, 2000. Any disputes shall be
              subject to the exclusive jurisdiction of the courts in New Delhi,
              India.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this policy from time to time. Material changes will
              be posted on our website with an updated date.
            </p>
          </Section>

          <Section title="11. Contact Us">
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
