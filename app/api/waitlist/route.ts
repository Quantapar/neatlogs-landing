import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  reason?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, company, reason } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
  }

  // Forward to Notion / Slack / Resend / wherever once configured. For now just
  // log so submissions are visible in dev and the page works end-to-end.
  console.log("[waitlist]", { name, email, company, reason, at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
