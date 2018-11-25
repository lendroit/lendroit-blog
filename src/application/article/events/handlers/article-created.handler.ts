import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ArticleCreated } from '../article-created.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../infrastructure/event/event.entity';
import { Repository } from 'typeorm';

@EventsHandler(ArticleCreated)
export class ArticleCreatedHandler implements IEventHandler<ArticleCreated> {
  constructor(@InjectRepository(Event) private readonly EventRepository: Repository<Event>) {}
  handle(event: ArticleCreated) {
    const articleCreatedEvent = new Event();
    articleCreatedEvent.payload = event;
    articleCreatedEvent.aggregateId = event.id;
    const { constructor } = Object.getPrototypeOf(event);
    articleCreatedEvent.className = constructor.name;
    this.EventRepository.save(articleCreatedEvent);
    return;
  }
}
