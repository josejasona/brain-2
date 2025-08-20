import { client } from "@/lib/db.ts"

export const runtime = "nodejs" 

export async function GET() {
    try {
    const { rows: [row] } = await client.query("SELECT NOW() as now");
    return Response.json({ ok: true, now: row.now });
  } catch (err: any) {
    return Response.json(
      { ok: false, error: String(err?.message ?? err) },
      { status: 500 }
    );
  }
 }

