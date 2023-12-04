import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function DELETE(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const idHeader = request.headers.get("Id");

    const response = await fetch(`${API_URL}/usuarios/${idHeader}`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader,
      },
      body: JSON.stringify({
        
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