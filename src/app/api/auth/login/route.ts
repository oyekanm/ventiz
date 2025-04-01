import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Payload = {
  value: string;
};



export async function GET(req: NextRequest) {
    try {
      const cookie = await cookies()
      cookie.delete("user")

        return NextResponse.json({message:"success"});
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
// TODO:change user cookie to id and token for authvalidation
export async function POST(req: NextRequest) {
  const cookie =  cookies()
  const body = await req.json();
  console.log(body);

  try {
      // Fetch data from your backend API
    
      const res = await fetch("https://9sxeaygjo0.execute-api.eu-north-1.amazonaws.com/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    const data = await res.json();
   
    if (res.status !== 200) {
      return NextResponse.json(
        { error: data.message },
        { status: res.status }
      );
    }

    // req.cookies.set("user",JSON.stringify(data.data))
    // cookies().set({
    //   name: "theme",
    //   value: "light || dark",
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 365 * 1000,
    //   expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
    // });

    const user = {
      _id:data.data._id,
      token:data.data.token
    }
    console.log(user)

    // cookie.set({
    //   name: 'user',
    //   value: JSON.stringify(user),
    //   secure:  true,
    // })

    return NextResponse.json({message:"success",data:user});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
