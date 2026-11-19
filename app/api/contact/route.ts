import { NextResponse } from 'next/server';

const CRM_BASE_URL = process.env.CRM_BASE_URL ?? 'http://160.236.68.94';
const CRM_API_KEY = process.env.CRM_API_KEY;
const CRM_API_SECRET = process.env.CRM_API_SECRET;
const CRM_LEAD_OWNER = process.env.CRM_LEAD_OWNER;

type Submission = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  if (!CRM_API_KEY || !CRM_API_SECRET) {
    return NextResponse.json(
      { error: 'Online messaging is not configured yet. Please email admission@gcua.us.' },
      { status: 503 },
    );
  }

  let body: Submission;
  try {
    body = (await request.json()) as Submission;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const subject = clean(body.subject, 120);
  const message = clean(body.message, 4000);

  if (!name || !email || !subject || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Please provide your name, a valid email address, subject, and message.' },
      { status: 400 },
    );
  }

  const [firstName, ...rest] = name.split(/\s+/);
  const lead = {
    doctype: 'CRM Lead',
    first_name: firstName,
    last_name: rest.join(' ') || undefined,
    email,
    mobile_no: phone || undefined,
    company_description: `Website contact - ${subject}\n\n${message}`,
    status: 'New',
    lead_owner: CRM_LEAD_OWNER || undefined,
  };

  try {
    const response = await fetch(`${CRM_BASE_URL}/api/resource/CRM%20Lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${CRM_API_KEY}:${CRM_API_SECRET}`,
      },
      body: JSON.stringify(lead),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'We could not send your message. Please try again or email admission@gcua.us.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'We could not reach the GCUA admissions system. Please try again.' },
      { status: 502 },
    );
  }
}
