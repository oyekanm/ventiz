import { verifyAuth } from "@/utils/verifyAuth";
import axios from "axios";
import { error } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Payload = {
    value: string;
};

const url = "https://67066wrd1c.execute-api.eu-north-1.amazonaws.com"


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

    
    // const token = req.headers.get("Authorization")


    if (id) {
        try {
            // Fetch data from your backend API
    
            const res = await fetch(`${url}/get-refund-requests/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
            })
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
