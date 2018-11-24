import { IEvent } from '@nestjs/cqrs';

export class ArticleCreatedEvent implements IEvent {
  constructor(id: number, name: string, content: string) {
    this.id = id;
    this.name = name;
    this.content = content;
  }
  // rename to aggregate id
  id: number;
  name: string;
  content: string;
}
