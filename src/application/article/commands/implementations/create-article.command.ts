import { ICommand } from '@nestjs/cqrs';
import { CreateArticleDto } from 'application/article/interfaces/create-article.dto';

export class CreateArticleCommand implements ICommand {
  constructor(public readonly newArticle: CreateArticleDto) {}
}
