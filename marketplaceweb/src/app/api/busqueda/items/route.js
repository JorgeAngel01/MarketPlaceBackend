import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const idRestaurante = request.headers.get("Restaurante");
    const idProveedor = request.headers.get("Proveedor");

    let url = `${API_URL}/items/by?`;

    if (idRestaurante) url += `restaurante=${idRestaurante}`;
    if (idProveedor) url += `proveedor=${idProveedor}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
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

