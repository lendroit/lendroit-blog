import { AggregateRoot as RawAggregateRoot } from '@nestjs/cqrs';
import { getRepository } from 'typeorm';
import { Event } from './infrastructure/event/event.entity';

export class AggregateRoot extends RawAggregateRoot {
  id: number;

  publish(event: Event) {
    // @todo implement a store event that adds the aggregateId and the classname
    const storedEvent = new Event();
    storedEvent.payload = event;
    storedEvent.aggregateId = this.id;
    const { constructor } = Object.getPrototypeOf(event);
    storedEvent.className = constructor.name;
    getRepository(Event).save(storedEvent);
  }
}
