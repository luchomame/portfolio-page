export const runtime = "nodejs";
import { NextResponse } from "next/server";

// OPTIONAL: server-side analytics (will no-op on free if not enabled)
let track:
  | ((name: string, data?: Record<string, any>) => Promise<void>)
  | null = null;
try {
  // This import exists in @vercel/analytics v1.1+; safe to try/catch
  // @ts-ignore
  track = (await import("@vercel/analytics/server")).track as typeof track;
} catch (_) {
  /* analytics server import not available; ignore */
}

const FILE_ID = process.env.RESUME_FILE_ID;

export async function GET(req: Request) {
  // (Optional) log a server-side analytics event
  try {
    await track?.("resume_download", {
      ua: req.headers.get("user-agent") || "",
      ref: req.headers.get("referer") || "",
    });
  } catch {
    /* ignore analytics errors */
  }

  // Fetch from Google Drive "direct download" endpoint
  const driveUrl = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;
  const res = await fetch(driveUrl);

  if (!res.ok) {
    return new NextResponse("Resume unavailable", { status: 502 });
  }

  const buf = await res.arrayBuffer();

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Luis_Tupac_Resume.pdf"',
      // Cache aggressively; change filename to bust cache when you update the PDF
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
