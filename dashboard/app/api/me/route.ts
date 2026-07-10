import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET() {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/me`;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
  
  try {
    const apiResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cookieHeader
      },
    });

    if(!apiResponse.ok) {
        if(apiResponse.status === 401) {
            return NextResponse.json({ error: "Yetki yok." }, { status: 401 });
        } else {
            throw new Error("Bilinmeyen bir hata oluştu.");
        }
    }
    
    const data = await apiResponse.json();
    return NextResponse.json(data, { status: apiResponse.status });
  } catch (error) {
    console.error("Proxy API hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}