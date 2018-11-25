import { IEvent } from '@nestjs/cqrs';

export namespace ArticleEvents {
  export class ArticleCreated implements IEvent {
    constructor({ id, name, content }: { id: number; name: string; content: string }) {
      this.id = id;
      this.name = name;
      this.content = content;
    }
    // rename to aggregate id
    id: number;
    name: string;
    content: string;
  }

  export class ArticlePublished implements IEvent {
    constructor(public readonly id: number) {}
  }
}
