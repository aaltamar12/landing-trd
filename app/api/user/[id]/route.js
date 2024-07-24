import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  const { id } = params;

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("user").select().match({ id });

  return new Response(JSON.stringify(data[0]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req, { params }) {
  const { id } = params;
  const body = await req.json();

  return new Response(JSON.stringify({ id, ...body }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
