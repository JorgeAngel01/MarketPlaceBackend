import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch("http://127.0.0.1:8000/restaurantes/", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}