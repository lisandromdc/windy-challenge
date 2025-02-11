import express, { Request, Response, Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app: Application = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const emitEventHandler = (req: Request, res: Response) => {
  const { event, data } = req.body as { event: string; data: any };

  if (!event || !data) {
    return res.status(400).json({ error: 'Missing event or data' });
  }

  io.emit(event, data);
  res.json({ success: true });
};

app.post('/emit', emitEventHandler);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

export default io;
