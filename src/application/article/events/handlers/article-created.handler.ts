import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ArticleCreated } from '../article-created.event';
import { getRepository } from 'typeorm';
import { Catalog } from '../../../catalog/catalog.entity';

@EventsHandler(ArticleCreated)
export class ArticleCreatedHandler implements IEventHandler<ArticleCreated> {
  async handle(event: ArticleCreated) {
    const catalogRepository = getRepository(Catalog);
    const articleCatalog: Catalog = (await catalogRepository.findOne('article')) || {
      entityName: 'article',
      ids: [],
    };
    articleCatalog.ids.push(event.id);
    catalogRepository.save(articleCatalog);
  }
}
