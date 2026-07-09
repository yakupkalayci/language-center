'use client';
import { useEffect } from "react";

export default function Home() {

  const getUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/me`, {
      credentials: 'include'
    });
    console.log("tst", res);
    
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="border">
      Test
    </div>
  );
}
