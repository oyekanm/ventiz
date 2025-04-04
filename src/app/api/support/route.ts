import { verifyAuth } from "@/utils/verifyAuth";
import axios from "axios";
import { error } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Payload = {
  value: string;
};

const url = "https://67066wrd1c.execute-api.eu-north-1.amazonaws.com";

// /user/{userId},
//

export async function GET(req: NextRequest) {
  const auth = await verifyAuth();

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const token = auth.token;
  const urls = new URL(req.url);

  const id = urls.searchParams.get("id");
  const type = urls.searchParams.get("type");
  const ids = urls.searchParams.get("ids");
  const types = urls.searchParams.get("types");

  // const token = req.headers.get("Authorization")

  if (id) {
    try {
      // Fetch data from your backend API

      const res = await fetch(`${url}/get-refund-requests/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await res.json();

      if (res.status !== 200) {
        return NextResponse.json(
          { error: data.message },
          { status: res.status }
        );
      }

      return NextResponse.json(data);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  if (ids && types) {
    console.log(ids, types);
    const validTypes = ["get-payout", "delete-payout"];
    if (!validTypes.includes(types!)) {
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }
    try {
      // Fetch data from your backend API
      const res = await fetch(`${url}/${types}/${ids}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await res.json();

      console.log(data);

      if (res.status !== 200) {
        return NextResponse.json(
          { error: data.message },
          { status: res.status }
        );
      }

      return NextResponse.json(data);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  try {
    // Fetch data from your backend API
    const validTypes = ["get-refund-requests", "get-transactions"];
    if (!validTypes.includes(type!)) {
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }


    // const res = await fetch(`${url}/all-events`, {
    const res = await fetch(`${url}/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    
    const data = await res.json();
    console.log(`${url}/${type}`,data,res)

    if (res.status !== 200) {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const auth = await verifyAuth();

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const token = auth.token;
  const body = await req.json();
  console.log(body,`${url}/create-payout`);
  // const token = req.headers.get("Authorization")
  // console.log(token);
  try {
    // Fetch data from your backend API

    const res = await fetch(`${url}/create-payout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (res.status !== 201) {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }

    console.log(data);
    return NextResponse.json({ message: data.message });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {
  // update-user-notification/{userId}
  // update-user/${userId}
  const auth = await verifyAuth();

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const token = auth.token;
  const body = await req.json();
  const urls = new URL(req.url);
  const ids = urls.searchParams.get("ids");
  const type = urls.searchParams.get("type");

  // console.log(`${url}/${type}/${ids}`,body)

  // console.log(token, body, end);
  if (ids && type) {
    const validTypes = ["update-payout"];
    if (!validTypes.includes(type!)) {
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }
    try {
      // Fetch data from your backend API
      const res = await fetch(`${url}/${type}/${ids}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      // console.log(data)

      if (res.status !== 200) {
        return NextResponse.json(
          { error: data.message },
          { status: res.status }
        );
      }

      return NextResponse.json(data);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
