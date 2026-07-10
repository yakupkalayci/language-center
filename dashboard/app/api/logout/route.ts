import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/logout`;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Cookie: cookieHeader
            },
        });

        const result = await res.json();
        if (result.status === 'success') {
            const response = NextResponse.json(result, {
                status: res.status,
            });
            const setCookie = res.headers.get("set-cookie");
            if (setCookie) {
                response.headers.set("set-cookie", setCookie);
            }
            return response;
        }

        const response = NextResponse.json({ message: "Logout successful" });
        return response;
    } catch (error) {
        console.error("Proxy API hatası:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }

}
