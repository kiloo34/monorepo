'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { hasSession } from '@/utils/session';
import { Provider } from 'react-redux';
import { store } from '@/store';

const MainPage = () => {
    const router = useRouter();

    useEffect(() => {
        if (hasSession()) {
            router.replace('/dashboard');
        } else {
            router.replace('/auth/login');
        }
    }, [router]);

    return null;
};

export default MainPage;
