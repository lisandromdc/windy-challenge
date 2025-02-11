import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejar preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: response.headers });
  }

  return response;
}

// Aplicar solo a las rutas de la API en /api/*
export const config = {
  matcher: '/api/:path*',
};
