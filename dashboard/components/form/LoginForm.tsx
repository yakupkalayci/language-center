import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Input from './form-items/Input';
import Button from '../cta/Button';

function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await fetch("/api/login", {
                method: 'POST',
                body: JSON.stringify({
                    email, password
                })
            });

            if(!res.ok) {
                throw new Error("Hatalı giriş.");
            }

            const response = await res.json();
            if(response.status === 'success') {
                router.push("/");
            }
            
        } catch(err) {
            console.log("handleLogin fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className='flex flex-col items-center justify-start gap-4' onSubmit={(e) => handleLogin(e)}>
            <div className='text-center mb-4'>
                <p className='text-[24px] font-bold mb-2'>Hoş Geldiniz!</p>
                <p>Lütfen e-posta adresinizi ve şifrenizi girerek giriş yapınız.</p>
            </div>
            <Input
                name='email'
                type='email'
                placeholder='E-posta Adresi'
                value={email}
                onChange={val => setEmail(val)}
            />
            <Input
                name='password'
                type='password'
                placeholder='Şifre'
                value={password}
                onChange={val => setPassword(val)}
            />
            <Button 
                type='submit'
                disabled={isLoading}
                title={isLoading ? 'Giriş Yapılıyor...' : "Giriş Yap" }
            />
        </form>
    )
}

export default LoginForm;