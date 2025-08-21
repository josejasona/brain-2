import { client } from "@/lib/db.ts";


export async function POST(req: Request) {
   try { 
       const insert = "INSERT INTO Users(username, email, password) VALUES($1, $2, $3) RETURNING *"
       const { username , email, password } = await req.json();


       if (!username || !email || !password) {
          return Response.json({ ok : false, error: "one of the fields is missing"} ,{ status: 400}  );
       }

       const params = [username , email , password ];


       const { rows: [user] } = await client.query(insert, params);
       
       return Response.json({ ok: true, user});
       } catch (err : any) {
          console.error("create-account error:", err);
          return Response.json(
          { ok: false, error: String(err?.message ?? err) },
          { status: 500 });}
}
