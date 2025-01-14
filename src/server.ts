import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Create an HTTP server using the Express app
const httpServer = new Server(app);

// Set up Socket.IO
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: ['http://localhost:5173'],
    },
});

// Store user socket mappings
const userSocketMap: { [userId: string]: string } = {};

export function getReceiverSocketId(userId: string): string | undefined {
    return userSocketMap[userId];
}

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    const userId = socket.handshake.query.userId as string | undefined;

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
        if (userId) {
            delete userSocketMap[userId];
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        server = httpServer.listen(config.port, () => {
            console.log(`App listening on port ${config.port}`);
        });
    } catch (err) {
        console.log(err);
    }
}

main();

process.on('unhandledRejection', (reason) => {
    console.log('👍👍 unhandled Rejection detected. Shutting down 👍👍', reason);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.log('👍👍 Uncaught Exception detected. Shutting down 👍👍 ', err);
    process.exit(1);
});
