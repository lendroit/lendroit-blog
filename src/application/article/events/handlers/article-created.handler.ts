import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ArticleCreated } from '../article-created.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../infrastructure/event/event.entity';
import { Repository } from 'typeorm';

@EventsHandler(ArticleCreated)
export class ArticleCreatedHandler implements IEventHandler<ArticleCreated> {
  handle(event: ArticleCreated) {
    // @todo add articleId to a list of all the articles
  }
}
