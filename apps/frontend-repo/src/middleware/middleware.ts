import { NextResponse } from 'next/server';

// export function middleware(req: Request) {
//     const token = req.cookies.get('authToken');

//     const url = req.nextUrl.clone();

//     if (!token && url.pathname.startsWith('/dashboard')) {
//         // Redirect unauthenticated users to login
//         url.pathname = '/login';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }
