import { Module, OnModuleInit } from '@nestjs/common';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { handlersList } from './commands/handlers';
import { ModuleRef } from '@nestjs/core';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleResolver } from './article.resolver';

@Module({
  imports: [CQRSModule, TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, ...handlersList, ArticleResolver],
})
export class ArticleModule implements OnModuleInit {
  constructor(private readonly commandBus$: CommandBus, private readonly moduleRef: ModuleRef) {}
  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register(handlersList);
  }
}
