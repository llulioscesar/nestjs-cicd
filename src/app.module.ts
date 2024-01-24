import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [TasksModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
