import { NextResponse } from 'next/server';

type Data = any;

export const responseHelper = {
  success: {
    post(data: Data) {
      return NextResponse.json(data, { status: 201 });
    },
    put(data: Data) {
      return NextResponse.json(data, { status: 200 });
    },
    get(data: Data) {
      return NextResponse.json(data, { status: 200 });
    },
  },
  error: {
    validation(error: Data, message?: string) {
      return NextResponse.json({ error, message }, { status: 400 });
    },
    notFound(error: Data, message?: string) {
      return NextResponse.json({ error, message }, { status: 404 });
    },
    server(error: Data, message: string) {
      return NextResponse.json({ error, message }, { status: 500 });
    },
  },
}
