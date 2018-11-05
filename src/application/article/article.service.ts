import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ArticleDto } from './interfaces/create-article.dto';
import { CreateArticleCommand } from './commands/implementations/create-article.command';
import { UpdateArticleCommand } from './commands/implementations/update-article.command';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(private readonly commandBus: CommandBus) {}

  async createArticle(createArticleDto: ArticleDto) {
    return await this.commandBus.execute(new CreateArticleCommand(createArticleDto));
  }

  async updateArticle(articleId: Article['id'], updateArticleDto: ArticleDto) {
    return await this.commandBus.execute(new UpdateArticleCommand(articleId, updateArticleDto));
  }

  root() {
    return 'Un article';
  }
}
