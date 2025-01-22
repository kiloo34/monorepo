'use client';

import React from 'react';
import { Box, BoxProps } from '@mui/material';

const AuthLayout: React.FC<{ children: React.ReactNode } & BoxProps> = ({ children }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f4f6f8',
            padding: 3,
        }}
    >
        {children}
    </Box>
);


export default AuthLayout;
