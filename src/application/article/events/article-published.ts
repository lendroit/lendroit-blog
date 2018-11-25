import { IEvent } from '@nestjs/cqrs';

export class ArticlePublished implements IEvent {
  constructor(public readonly id: number) {}
}
