import { NextRequest, NextResponse } from "next/server";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbztlJpfxXOuogoxJ_JnFxSoBZa9sM6GMJ4M72CeF-ixapmG3Z3O5fk468LVVlMlBFKxHw/exec";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const url = `${SHEET_URL}?email=${encodeURIComponent(email)}`;
  const res = await fetch(url, { redirect: "follow" });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
