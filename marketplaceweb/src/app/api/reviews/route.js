import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request) {
  try {
    const username = request.headers.get("username");
    const idRestaurante = request.headers.get("idRestaurante");
    const idProveedor = request.headers.get("idProveedor");
    const idProducto = request.headers.get("idProducto");

    let url = `${API_URL}/reviews/`;

    if (username) url += `by?username=${username}`;
    if (idRestaurante) url += `by?restaurante=${idRestaurante}`;
    if (idProveedor) url += `by?proveedor=${idProveedor}`;
    if (idProducto) url += `by?producto=${idProducto}`;

    const response = await fetch(url, {
      method: "GET",
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

export async function PATCH(request) {
  const requestBody = await request.json();
  const idHeader = await request.headers.get("Id");
  console.log("request", requestBody);
  try {
    const response = await fetch(`${API_URL}/reviews/${idHeader}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
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
