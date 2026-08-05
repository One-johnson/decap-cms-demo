import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // Demo-friendly fallback when no email provider is configured yet
    console.info("[contact form]", { name, email, phone, message });
    return NextResponse.json({
      ok: true,
      demo: true,
      message:
        "Form received. Add WEB3FORMS_ACCESS_KEY to deliver messages by email.",
    });
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New contact message from ${name}`,
      from_name: name,
      name,
      email,
      phone,
      message,
    }),
  });

  const result = (await response.json()) as {
    success?: boolean;
    message?: string;
  };

  if (!response.ok || !result.success) {
    return NextResponse.json(
      { error: result.message || "Failed to send message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
