'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from './store/userStore';

export default function AppInitializer({ children }: { children: ReactNode }) {

    const pathname = usePathname();
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [pathname]);

    return (
        <>
            {children}
        </>
    );
}
