import { Module, OnModuleInit } from '@nestjs/common';
import { CQRSModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { handlersList } from './commands/handlers';
import { ArticlePublishedHandler } from './events/handlers/article-published.handler';
import { ModuleRef } from '@nestjs/core';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleResolver } from './article.resolver';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [CQRSModule, TypeOrmModule.forFeature([Article]), AuthenticationModule],
  controllers: [ArticleController],
  providers: [ArticleService, ...handlersList, ArticleResolver, ArticlePublishedHandler],
})
export class ArticleModule implements OnModuleInit {
  constructor(
    private readonly commandBus$: CommandBus,
    private readonly eventBus$: EventBus,
    private readonly moduleRef: ModuleRef,
  ) {}
  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register(handlersList);
    this.eventBus$.setModuleRef(this.moduleRef);
    this.eventBus$.register([ArticlePublishedHandler]);
  }
}
