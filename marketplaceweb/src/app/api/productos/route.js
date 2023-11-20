import { NextResponse } from "next/server";

export async function PATCH(request) {
  const requestBody = await request.json();
  const idHeader = await request.headers.get("Id");
  console.log("request", requestBody)
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/productos/${idHeader}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();
    console.log(data);

    // Return the updated data as a response
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
