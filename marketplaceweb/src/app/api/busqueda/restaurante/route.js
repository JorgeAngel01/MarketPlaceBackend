import { NextResponse } from "next/server";

export async function GET(request) {
  const authHeader = request.headers.get("Authorization");
  const nameHeader = request.headers.get("Username");
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/restaurante/${nameHeader}`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      }
    );
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