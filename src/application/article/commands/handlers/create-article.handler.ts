import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { Repository } from 'typeorm';
import { Article } from '../../article.entity';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(
    @InjectRepository(Article) private readonly repository: Repository<Article>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateArticleCommand, resolve: (value?) => void) {
    const article = new Article();
    article.name = command.newArticle.name;
    article.content = command.newArticle.content;
    article.isPublished = false;
    article.createdAt = new Date();
    const storedArticle = await this.repository.save(article);
    // Event sourcing
    const articleObject = this.publisher.mergeObjectContext(article);
    articleObject.createArticle(command.newArticle.name, command.newArticle.content);
    articleObject.commit();
    resolve(storedArticle);
  }
}
