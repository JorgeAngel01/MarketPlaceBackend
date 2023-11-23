import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request) {
  const authHeader = request.headers.get("Authorization");
  const idHeader = request.headers.get("Id");
  try {
    const response = await fetch(
      `${API_URL}/productos_proveedor/${idHeader}`,
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
