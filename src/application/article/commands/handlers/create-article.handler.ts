import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { Article } from '../../article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from '../../../catalog/catalog.entity';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    @InjectRepository(Catalog) private readonly catalogRepository: Repository<Catalog>,
  ) {}
  async execute(command: CreateArticleCommand, resolve: (value?) => void) {
    const articleIds: Article['id'][] = (
      (await this.catalogRepository.findOne('article')) || {
        entityName: 'article',
        ids: [0],
      }
    ).ids;
    const articleId: Article['id'] = Math.max(...articleIds) + 1;
    const article = new Article();
    article.name = command.newArticle.name;
    article.content = command.newArticle.content;
    article.id = articleId;
    article.isPublished = false;
    article.createArticle(command.newArticle.name, command.newArticle.content);
    article.commit();
    resolve(article);
  }
}
