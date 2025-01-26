import { NextResponse } from 'next/server';
import { Server } from 'socket.io';

const io = new Server();

export async function GET() {
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return NextResponse.json({ message: 'WebSocket server running' });
}
