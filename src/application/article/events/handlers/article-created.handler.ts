import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ArticleCreated } from '../article-created.event';

@EventsHandler(ArticleCreated)
export class ArticleCreatedHandler implements IEventHandler<ArticleCreated> {
  handle(event: ArticleCreated) {
    // @todo add articleId to a list of all the articles
  }
}
