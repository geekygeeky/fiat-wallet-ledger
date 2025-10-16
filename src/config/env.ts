export const schema = {
    type: 'object',
    required: [
        'PORT',
        'NODE_ENV',
        'HOST'
    ] as const,
    properties: {
        PORT: {
            type: 'number',
            default: 8080,
        },
        HOST: { type: 'string' },
        NODE_ENV: { type: 'string' },
    },
} as const;

type ConfigProperties = (typeof schema)['properties'];
type ConfigPropertyKey = keyof ConfigProperties;
type ConfigPropertyType<K extends ConfigPropertyKey> =
    ConfigProperties[K]['type'] extends 'string'
    ? string
    : ConfigProperties[K]['type'] extends 'number'
    ? number
    : never;

type Config = {
    [K in ConfigPropertyKey]: ConfigPropertyType<K>;
};

declare module 'fastify' {
    interface FastifyInstance {
        config: Config;
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Config { }
    }
}
