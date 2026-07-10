'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/userStore";
import Container from "./Container";
import Button from "../cta/Button";

function Header() {

    const router = useRouter();
    const { isAuthenticated, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    }

    return (
        <header className='bg-linear-90 from-[#5E0098] to-[#FFC1C1] text-white'>
            <Container extraClass="flex justify-between items-center gap-4">
                <Link href={"/"} className="mx-auto">
                    <Image
                        src={"/logo-white.png"}
                        alt=""
                        width={"120"}
                        height={"120"}
                    />
                </Link>
                {
                    !isAuthenticated ? (
                        <Link
                            href={"/login"}
                        >
                            <Button title="Giriş Yap" />
                        </Link>
                    ) : (
                        <Button title="Çıkış Yap" onClick={handleLogout} />
                    )
                }
            </Container>
        </header>
    )
}

export default Header;