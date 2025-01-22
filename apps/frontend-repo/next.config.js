export async function rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'https://localhost:3000/:path*',
    },
  ];
}
