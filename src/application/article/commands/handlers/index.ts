import { CreateArticleHandler } from './create-article.handler';
import { UpdateArticleHandler } from './update-article.handler';
import { PublishArticleHanlder } from './publish-article.handler';
import { StoreEventHandler } from './store-event.handler';

export const commandHandlers = [
  CreateArticleHandler,
  UpdateArticleHandler,
  PublishArticleHanlder,
  StoreEventHandler,
];
