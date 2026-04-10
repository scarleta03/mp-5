import { NextRequest, NextResponse } from "next/server";
import { createShortUrl, getUrlByAlias } from "@/lib/urls";

function randomAlias() {
    return Math.random().toString(36).slice(2, 8);
}

export async function POST(req: NextRequest) {
    const { url, alias: rawAlias } = await req.json();

    // validate url
    try {
        new URL(url);
    } catch {
        return NextResponse.json({ error: "Invalid URL." }, { status: 400 });
    }

    const alias = rawAlias?.trim() || randomAlias();

    // check if alias is taken
    const existing = await getUrlByAlias(alias);
    if (existing) {
        return NextResponse.json({ error: "Alias already taken." }, { status: 409 });
    }

    const entry = await createShortUrl(alias, url);
    return NextResponse.json(entry, { status: 201 });
}