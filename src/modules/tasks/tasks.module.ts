import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { LoggingMiddleware } from 'src/middlewares';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggingMiddleware)
    .forRoutes(TasksController);
  }
}
