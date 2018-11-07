import { ICommand } from '@nestjs/cqrs';
import { ArticleDto } from '../../interfaces/article.dto';
import { Article } from 'application/article/article.entity';

export class UpdateArticleCommand implements ICommand {
  constructor(public articleId: Article['id'], public updatedArticle: ArticleDto) {}
}
