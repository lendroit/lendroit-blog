import { IEvent } from '@nestjs/cqrs';
import { ArticleCreated as ArticleCreatedImplementation } from './article-created.event';
import { ArticlePublished as ArticlePublishedImplementation } from './article-published';

export namespace ArticleEvents {
  export class ArticleCreated extends ArticleCreatedImplementation {}

  export class ArticlePublished extends ArticlePublishedImplementation {}
}
