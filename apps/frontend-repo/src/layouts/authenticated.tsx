'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div>
        <Navbar />
        {children}
    </div>
);

export default AuthenticatedLayout;
