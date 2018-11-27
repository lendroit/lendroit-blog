import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { Article } from '../../article.entity';
import { getRepository } from 'typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  async execute(command: CreateArticleCommand, resolve: (value?) => void) {
    const article = new Article();
    // TODO remove all this shit, handle the id creation myself
    article.name = command.newArticle.name;
    article.content = command.newArticle.content;
    article.isPublished = false;
    const articleWithID = await getRepository(Article).save(article);
    articleWithID.createArticle(command.newArticle.name, command.newArticle.content);
    articleWithID.commit();
    resolve(article);
  }
}
