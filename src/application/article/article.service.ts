import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateArticleDto } from './interfaces/create-article.dto';
import { CreateArticleCommand } from './commands/implementations/create-article.command';

@Injectable()
export class ArticleService {
  constructor(private readonly commandBus: CommandBus) {}

  async createArticle(createArticleDto: CreateArticleDto) {
    return await this.commandBus.execute(new CreateArticleCommand(createArticleDto.name));
  }

  root() {
    return 'Un article';
  }
}
