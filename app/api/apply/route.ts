import { NextResponse } from 'next/server';

const CRM_BASE_URL = process.env.CRM_BASE_URL ?? 'http://160.236.68.94';
const CRM_API_KEY = process.env.CRM_API_KEY;
const CRM_API_SECRET = process.env.CRM_API_SECRET;
const CRM_LEAD_OWNER = process.env.CRM_LEAD_OWNER;

type Submission = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  interest?: unknown;
};

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  if (!CRM_API_KEY || !CRM_API_SECRET) {
    return NextResponse.json(
      { error: 'The application form is not configured yet. Please contact us directly.' },
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
  const email = clean(body.email, 160);
  const whatsapp = clean(body.whatsapp, 40);
  const interest = clean(body.interest, 2000);

  if (!name || !interest || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Please provide your name, a valid email address, and your ministry or study interest.' },
      { status: 400 },
    );
  }

  const [firstName, ...rest] = name.split(/\s+/);
  const lead = {
    doctype: 'CRM Lead',
    first_name: firstName,
    last_name: rest.join(' ') || undefined,
    email,
    mobile_no: whatsapp || undefined,
    company_description: interest,
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
      const detail = await response.text();
      console.error('CRM lead creation failed', response.status, detail.slice(0, 300));
      return NextResponse.json(
        { error: 'We could not submit your request. Please try again or contact us directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('CRM lead creation error', error);
    return NextResponse.json(
      { error: 'We could not reach the admissions system. Please try again or contact us directly.' },
      { status: 502 },
    );
  }
}
