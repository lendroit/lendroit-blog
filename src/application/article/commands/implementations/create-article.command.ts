import { ICommand } from '@nestjs/cqrs';
import { ArticleDto } from 'application/article/interfaces/article.dto';

export class CreateArticleCommand implements ICommand {
  constructor(public readonly newArticle: ArticleDto) {}
}
