import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        server = app.listen(config.port, () => {
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

