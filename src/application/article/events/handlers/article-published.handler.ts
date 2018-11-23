import { EventsHandler, IEventHandler, EventPublisher } from '@nestjs/cqrs';
import { ArticlePublishedEvent } from '../article-published';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../article.entity';
import { Repository } from 'typeorm';

@EventsHandler(ArticlePublishedEvent)
export class ArticlePublishedHandler implements IEventHandler<ArticlePublishedEvent> {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    private readonly publisher: EventPublisher,
  ) {}

  async handle(event: ArticlePublishedEvent) {
    return;
    // const article = this.publisher.mergeObjectContext(
    //   await this.articleRepository.findOne(event.id),
    // );
    // article.isPublished = false;
    // const updatedArticle = await this.articleRepository.save(article);
    // return updatedArticle;
  }
}
