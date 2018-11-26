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

@Module({
  imports: [CQRSModule, EventModule, TypeOrmModule.forFeature([Article]), AuthenticationModule],
  controllers: [ArticleController],
  providers: [ArticleCustomRepository, ArticleService, ...commandHandlers, ArticleResolver],
})
export class ArticleModule implements OnModuleInit {
  constructor(private readonly commandBus$: CommandBus, private readonly moduleRef: ModuleRef) {}
  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register(commandHandlers);
  }
}
