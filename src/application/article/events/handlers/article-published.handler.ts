import { EventsHandler, IEventHandler, EventPublisher } from '@nestjs/cqrs';
import { ArticlePublished } from '../article-published';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../article.entity';
import { Repository } from 'typeorm';

@EventsHandler(ArticlePublished)
export class ArticlePublishedHandler implements IEventHandler<ArticlePublished> {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    private readonly publisher: EventPublisher,
  ) {}

  async handle(event: ArticlePublished) {
    return;
    // const article = this.publisher.mergeObjectContext(
    //   await this.articleRepository.findOne(event.id),
    // );
    // article.isPublished = false;
    // const updatedArticle = await this.articleRepository.save(article);
    // return updatedArticle;
  }
}
