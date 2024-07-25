import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
  const {
    name,
    last_name,
    email,
    phone,
    country_code,
    credential_type,
    credential,
    useAsBillingInfo,
  } = await req.json();

  const supabase = createServerComponentClient({ cookies });

  const billingData = useAsBillingInfo
    ? {
        billing_name: name,
        billing_last_name: last_name,
        billing_email: email,
        billing_phone: phone,
        billing_credential_type: credential_type,
        billing_credential: credential,
      }
    : {};

  const userData = {
    name,
    last_name,
    email,
    phone,
    country_code,
    credential_type,
    credential,
    ...billingData,
  };

  const { status, statusText, data, error } = await supabase
    .from("user")
    .insert([userData])
    .select();

  if (error) {
    console.error({ error });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(
    JSON.stringify({ status: status, message: statusText, data: data[0] }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
