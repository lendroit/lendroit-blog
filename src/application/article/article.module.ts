import { Module, OnModuleInit } from '@nestjs/common';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { ModuleRef } from '@nestjs/core';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CQRSModule, TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, CreateArticleHandler],
})
export class ArticleModule implements OnModuleInit {
  constructor(private readonly commandBus$: CommandBus, private readonly moduleRef: ModuleRef) {}
  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register([CreateArticleHandler]);
  }
}
