import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateArticleCommand } from '../implementations/update-article.command';
import { Repository } from 'typeorm';
import { Article } from '../../article.entity';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(UpdateArticleCommand)
export class UpdateArticleHandler implements ICommandHandler<UpdateArticleCommand> {
  constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>) {}

  async execute(updateArticleCommand: UpdateArticleCommand, resolve: (Article) => void) {
    const article = await this.articleRepository.findOne(updateArticleCommand.articleId);
    article.content = updateArticleCommand.updatedArticle.content;
    article.name = updateArticleCommand.updatedArticle.name;
    await this.articleRepository.save(article);
    resolve(article);
  }
}
