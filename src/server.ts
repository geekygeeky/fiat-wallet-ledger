import fastify from 'fastify';


const server = fastify({
  logger: true,
});

export const startServer = async () => {
  try {
    const address = await server.listen({
      port: 8080,
      host: '0.0.0.0',
    });
    server.log.info(`Server running at ${address}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};