import { ArticlePublishedHandler } from './article-published.handler';
import { ArticleCreatedHandler } from './article-created.handler';

export const eventHandlers = [ArticleCreatedHandler, ArticlePublishedHandler];
