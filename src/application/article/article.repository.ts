import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../infrastructure/event/event.entity';
import { Article } from './article.entity';
import { Injectable } from '@nestjs/common';
import { eventList } from './events';
import { ArticleEvents } from './events/namespace';

const recreateEvent = (event: Event) => {
  const payload = event.payload;
  // handle if event is not in the namespace

  const articleEvent = new (ArticleEvents as any)[event.className](payload);
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
