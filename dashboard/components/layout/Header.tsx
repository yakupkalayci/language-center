import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Button from "../cta/Button";

function Header() {
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
                <Link
                    href={"/login"}
                >
                    <Button title="Giriş Yap" />
                </Link>
            </Container>
        </header>
    )
}

export default Header;