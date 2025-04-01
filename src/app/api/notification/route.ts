import { verifyAuth } from "@/utils/verifyAuth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const url = "https://sray41rsoa.execute-api.eu-north-1.amazonaws.com";

export async function GET(req: NextRequest) {
  const auth = await verifyAuth();

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const token = auth.token;
  const urls = new URL(req.url);

  const type = urls.searchParams.get("type");

  try {
    const validTypes = ["all-notifications"];
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
export async function PUT(req: NextRequest) {
  const auth = await verifyAuth();

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const token = auth.token;
  const urls = new URL(req.url);

  const id = urls.searchParams.get("id");
  const type = urls.searchParams.get("type");
  const types = urls.searchParams.get("types");

  console.log(id,types)

  if (id && types) {
    const validTypes = ["mark-read"];
    if (!validTypes.includes(types!)) {
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }
    try {
      // Fetch data from your backend API
      const res = await fetch(`${url}/${types}/${id}`, {
        method: "PUT",
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

  try {
    // Fetch data from your backend API
    // mark-read/${id}
    const validTypes = ["mark-all-read"];
    if (!validTypes.includes(type!)) {
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }

    // const res = await fetch(`${url}/all-events`, {
    const res = await fetch(`${url}/${type}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    const data = await res.json();
    console.log(data, res);

    if (data.message !== "success") {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }
    revalidatePath("/notifications");

    return NextResponse.json({ message: data.message });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
