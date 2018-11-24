import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ArticleCreatedEvent } from '../article-created.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../infrastructure/event/event.entity';
import { Repository } from 'typeorm';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedHandler implements IEventHandler<ArticleCreatedEvent> {
  constructor(@InjectRepository(Event) private readonly EventRepository: Repository<Event>) {}
  handle(event: ArticleCreatedEvent) {
    const articleCreatedEvent = new Event();
    articleCreatedEvent.payload = ({ name: event.name, content: event.content } as unknown) as JSON;
    articleCreatedEvent.aggregateId = event.id;
    this.EventRepository.save(articleCreatedEvent);
    return;
  }
}
