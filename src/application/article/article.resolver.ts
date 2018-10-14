import { Resolver, Query, Args } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver('Article')
export class ArticleResolver {
  constructor(@InjectRepository(Article) private readonly repository: Repository<Article>) {}

  @Query()
  article(@Args('id') id: number) {
    return this.repository.findOneOrFail(id);
  }

  @Query()
  articles() {
    return this.repository.find();
  }
}
