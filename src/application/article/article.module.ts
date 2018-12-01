import { Module, OnModuleInit } from '@nestjs/common';
import { CQRSModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { commandHandlers } from './commands/handlers';
import { ModuleRef } from '@nestjs/core';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleResolver } from './article.resolver';
import { AuthenticationModule } from '../authentication/authentication.module';
import { EventModule } from '../../infrastructure/event/event.module';
import { ArticleCustomRepository } from './article.repository';
import { CatalogModule } from '../catalog/catalog.module';
import { ArticleSaga } from './article.saga';

@Module({
  imports: [
    CQRSModule,
    EventModule,
    TypeOrmModule.forFeature([Article]),
    AuthenticationModule,
    CatalogModule,
  ],
  controllers: [ArticleController],
  providers: [
    ArticleCustomRepository,
    ArticleService,
    ...commandHandlers,
    ArticleResolver,
    ArticleSaga,
  ],
})
export class ArticleModule implements OnModuleInit {
  constructor(
    private readonly commandBus$: CommandBus,
    private readonly eventBus$: EventBus,
    private readonly moduleRef: ModuleRef,
    private readonly articleSaga: ArticleSaga,
  ) {}
  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register(commandHandlers);
    this.eventBus$.setModuleRef(this.moduleRef);
    this.eventBus$.register([]);
    this.eventBus$.combineSagas([this.articleSaga.storeArticle]);
  }
}
