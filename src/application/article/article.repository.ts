import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../infrastructure/event/event.entity';
import { Article } from './article.entity';
import { Injectable } from '@nestjs/common';
import { eventList } from './events';

const recreateEvent = (event: Event) => {
  const constructor = eventList[0];
  const payload = event.payload;
  const articleEvent = new constructor(payload.id, payload.name, payload.content);
  return articleEvent;
};

@Injectable()
export class ArticleCustomRepository {
  constructor(@InjectRepository(Event) private readonly EventRepository: Repository<Event>) {}
  async findById(aggregateId: Article['id']) {
    const article = new Article();
    const articleHistory: Event[] = await this.EventRepository.find({ where: { aggregateId } });
    const articleHistoryEvents = articleHistory.map(recreateEvent);
    article.loadFromHistory(articleHistoryEvents);
    return article;
  }
}
