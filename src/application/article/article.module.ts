import { Module, OnModuleInit } from '@nestjs/common';
import { CQRSModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';
import { ModuleRef } from '@nestjs/core';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleResolver } from './article.resolver';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [CQRSModule, TypeOrmModule.forFeature([Article]), AuthenticationModule],
  controllers: [ArticleController],
  providers: [ArticleService, ...commandHandlers, ...eventHandlers, ArticleResolver],
})
export class ArticleModule implements OnModuleInit {
  constructor(
    private readonly commandBus$: CommandBus,
    private readonly eventBus$: EventBus,
    private readonly moduleRef: ModuleRef,
  ) {}
  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register(commandHandlers);
    this.eventBus$.setModuleRef(this.moduleRef);
    this.eventBus$.register(eventHandlers);
  }
}
