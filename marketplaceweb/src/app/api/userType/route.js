import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the incoming request to get the body
    const body = await request.json();
    console.log("info del body", body)

    const response = await fetch("http://127.0.0.1:8000/proveedor/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
      }),
    });

    const data = await response.json();
    console.log(data);

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
