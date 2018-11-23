import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { PublishArticleCommand } from '../implementations/publish-article.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Article as ArticleEntity } from '../../article.entity';
import { Repository } from 'typeorm';

@CommandHandler(PublishArticleCommand)
export class PublishArticleHanlder implements ICommandHandler<PublishArticleCommand> {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: PublishArticleCommand, resolve: (value?) => void) {
    const article = this.publisher.mergeObjectContext(
      await this.articleRepository.findOne(command.articleId),
    );
    article.publishArticle();
    await article.commit();
    const updatedArticle = await this.articleRepository.findOne(command.articleId);
    resolve(updatedArticle);
  }
}
