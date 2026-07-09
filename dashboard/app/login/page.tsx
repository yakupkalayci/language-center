'use client';
import LoginForm from "@/components/form/LoginForm";
import Container from "@/components/layout/Container";

function LoginPage() {
  return (
    <div className="border flex justify-center items-center min-h-[calc(100vh-120px)]">
        <Container extraClass="w-[700px] bg-white p-[48px] rounded-[12px] shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
            <LoginForm />
        </Container>
    </div>
  )
}

export default LoginPage;