import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useValue: new Redis({
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT, 10),
                username: process.env.REDIS_USER,
                password: process.env.REDIS_PASSWORD,
            }),
        },
    ],
    exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
