import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { Article } from '../../article.entity';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  async execute(command: CreateArticleCommand, resolve: (value?) => void) {
    const article = new Article();
    article.createArticle(command.newArticle.name, command.newArticle.content);
    article.commit();
    resolve(article);
  }
}
