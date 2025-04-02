import { verifyAuth } from "@/utils/verifyAuth";
import axios from "axios";
import { error } from "console";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Payload = {
    value: string;
};

const url = "https://ft7jui3t11.execute-api.eu-north-1.amazonaws.com"


export async function GET(req: NextRequest) {
    const auth = await verifyAuth();
    console.log(auth)

    if (!auth.success) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const token = auth.token;
    const urls = new URL(req.url);

    const id = urls.searchParams.get("id");

    const creatorId = urls.searchParams.get("creatorId");
    const type = urls.searchParams.get("type");
    const types = urls.searchParams.get("types");
    // const token = req.headers.get("Authorization") /attendees/{eventId} /get-event/${id}


    console.log(type, creatorId)
    console.log(auth)

    if (creatorId) {
        console.log(auth)

        try {
            // Fetch data from your backend API
            const res = await fetch(`${url}/${type}&creatorId=${creatorId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
               
            })
            const data = await res.json();

            console.log(data, res)

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

    if (id && types) {
        console.log(auth)
        const validTypes = ['get-event', 'attendees'];
        if (!validTypes.includes(types!)) {
            return NextResponse.json(
                { error: "Invalid type parameter" },
                { status: 400 }
            );
        }
        try {
            // Fetch data from your backend API
            const res = await fetch(`${url}/${types}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                cache:"no-store",
                next:{
                    revalidate:0
                }
            })
            const data = await res.json();

            console.log(data, res)

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
        const validTypes = ['all-events', 'all-bookings'];
        if (!validTypes.includes(type!)) {
            return NextResponse.json(
                { error: "Invalid type parameter" },
                { status: 400 }
            );
        }

        // const res = await fetch(`${url}/all-events`, {
        const res = await fetch(`${url}/${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            cache:"no-store",
            next:{
                revalidate:0
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
export async function POST(req: NextRequest) {
    const auth = await verifyAuth();

    if (!auth.success) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const token = auth.token;
    const body = await req.json();
    console.log(JSON.stringify(body));
    // const token = req.headers.get("Authorization")
    console.log(`${url}/create-event`, JSON.stringify(body))
    try {
        // Fetch data from your backend API

        const res = await fetch(`${url}/create-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify(body)
        })
        // body:JSON.stringify(body)
        const data = await res.json();
        console.log(data)

        if (res.status !== 201) {
            return NextResponse.json(
                { error: data.message },
                { status: res.status }
            );
        }
        // revalidateTag('events');

        // // Also revalidate the paths where this data is used
        // revalidatePath('/events');
        // revalidatePath('/');
        // revalidatePath('/ticket-sales');
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
    const auth = await verifyAuth();

    if (!auth.success) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const token = auth.token;
    const body = await req.json();
    const urls = new URL(req.url);

    const id = urls.searchParams.get("id");
    const userId = urls.searchParams.get("userId");
    console.log(body, id, userId);
    // const token = req.headers.get("Authorization")
    console.log(token, auth, `${url}/update-event?eventId=${id}&creatorId=${userId}`, JSON.stringify(body))
    try {
        // Fetch data from your backend API

        const res = await fetch(`${url}/update-event?eventId=${id}&creatorId=${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json();

        console.log(data)

        if (res.status !== 200) {
            return NextResponse.json(
                { error: data.error },
                { status: res.status }
            );
        }
        return NextResponse.json({ message: data.message });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function DELETE(req: NextRequest) {
    const auth = await verifyAuth();

    if (!auth.success) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const token = auth.token;
    const urls = new URL(req.url);

    const id = urls.searchParams.get("id");
    const userId = urls.searchParams.get("userId");
    console.log(id, userId, `${url}/delete-event?creatorId=${userId}&eventId=${id}`);
    // creatorId=123&eventId=123
    // const token = req.headers.get("Authorization")
    console.log(auth)
    try {
        // Fetch data from your backend API

        // const res = await fetch(`https://ft7jui3t11.execute-api.eu-north-1.amazonaws.com/delete-event?eventid=${id}&creatorid=${userId}`, {
        const res = await fetch(`https://ft7jui3t11.execute-api.eu-north-1.amazonaws.com/delete-event?eventId=${id}&creatorId=${userId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
        })
        const data = await res.json();

        // if (res.status !== 201) {
        //     return NextResponse.json(
        //         { error: data.message },
        //         { status: res.status }
        //     );
        // }






        console.log(data, res)
        return NextResponse.json({ message: data.message });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

