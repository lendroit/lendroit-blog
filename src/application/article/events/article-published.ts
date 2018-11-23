import { IEvent } from '@nestjs/cqrs';

export class ArticlePublishedEvent implements IEvent {
  constructor(public readonly id: number) {}
}
