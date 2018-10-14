import { Injectable, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateArticleDto } from './interfaces/create-article.dto';
import { CreateArticleCommand } from './commands/implementations/create-article.command';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { ARTICLE_REPOSITORY_TOKEN } from './constants';

@Injectable()
export class ArticleService {
  constructor(
    private readonly commandBus: CommandBus,
  ) // @Inject(ARTICLE_REPOSITORY_TOKEN) private readonly articleRepository: Repository<Article>,
  {}

  async createArticle(createArticleDto: CreateArticleDto) {
    return await this.commandBus.execute(new CreateArticleCommand(createArticleDto.name));
  }

  root() {
    return 'Un article';
  }
}
