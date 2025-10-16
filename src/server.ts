import fastify from 'fastify';
import cors from '@fastify/cors'
import env from '@fastify/env'
import { schema } from './config/env.js'

const server = fastify({
    logger: true,
});

await server.register(env, {
    dotenv: true,
    data: process.env,
    schema,
});

await server.register(cors, {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
});

export const startServer = async () => {
    try {
        const address = await server.listen({
            port: server.config.PORT,
            host: server.config.HOST,
        });
        server.log.info(`Server running at ${address}`);
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};