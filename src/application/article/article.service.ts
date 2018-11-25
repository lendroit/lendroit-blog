import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ArticleDto } from './interfaces/article.dto';
import { CreateArticleCommand } from './commands/implementations/create-article.command';
import { UpdateArticleCommand } from './commands/implementations/update-article.command';
import { PublishArticleCommand } from './commands/implementations/publish-article.command';
import { Article } from './article.entity';
import { ArticleCustomRepository } from './article.repository';

@Injectable()
export class ArticleService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly articleRepository: ArticleCustomRepository,
  ) {}

  async createArticle(createArticleDto: ArticleDto) {
    return await this.commandBus.execute(new CreateArticleCommand(createArticleDto));
  }

  async updateArticle(articleId: Article['id'], updateArticleDto: ArticleDto) {
    return await this.commandBus.execute(new UpdateArticleCommand(articleId, updateArticleDto));
  }

  async publishArticle(articleId: Article['id']) {
    return await this.commandBus.execute(new PublishArticleCommand(articleId));
  }

  findById(articleId: Article['id']) {
    return this.articleRepository.findById(articleId);
  }

  root() {
    return 'Un article';
  }
}
