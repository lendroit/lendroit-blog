import { CreateArticleHandler } from './create-article.handler';
import { UpdateArticleHandler } from './update-article.handler';
import { PublishArticleHanlder } from './publish-article.handler';

export const commandHandlers = [CreateArticleHandler, UpdateArticleHandler, PublishArticleHanlder];
