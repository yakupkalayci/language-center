import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`;
    
    try {
        const body = await req.json();

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            return NextResponse.json(
                { message: 'Doğrulama hatası' },
                { status: res.status }
            );
        }

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

    } catch (error) {
        console.error("Proxy API hatası:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
