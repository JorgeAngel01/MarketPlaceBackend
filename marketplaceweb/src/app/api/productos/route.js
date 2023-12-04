import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request) {
  const authHeader = request.headers.get("Authorization");
  const idHeader = request.headers.get("Id");

  try {
    const response = await fetch(
      `${API_URL}/productos/${idHeader ? idHeader + "/" : ""}`,
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

export async function POST(request) {
  const requestBody = await request.json();
  console.log("request", requestBody);
  try {
    const response = await fetch(`${API_URL}/productos/`, {
      method: "POST",
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

export async function PATCH(request) {
  const requestBody = await request.json();
  const idHeader = await request.headers.get("Id");
  console.log("request", requestBody);
  try {
    const response = await fetch(`${API_URL}/productos/${idHeader}/`, {
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

export async function DELETE(request) {
  const authHeader = request.headers.get("Authorization");
  const idHeader = request.headers.get("Id");

  try {
    const response = await fetch(`${API_URL}/productos/${idHeader}/`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader,
      },
    });

    if (response.headers.get("Content-Type")?.includes("application/json")) {
      const data = await response.json();
      console.log(data);

      return new NextResponse(JSON.stringify(data), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new NextResponse(null, {
        status: response.status,
      });
    }
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
