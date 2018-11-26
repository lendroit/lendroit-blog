import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleDto } from './interfaces/article.dto';
import { Catalog } from '../catalog/catalog.entity';

@Resolver('Article')
export class ArticleResolver {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    private readonly articleService: ArticleService,
  ) {}

  @Query()
  article(@Args('id') id: number) {
    return this.articleRepository.findOneOrFail(id);
  }

  @Query()
  articles() {
    return this.articleRepository.find();
  }

  @Mutation()
  createArticle(@Args('name') name: string, @Args('content') content: string) {
    const articleDto: ArticleDto = { name, content };
    return this.articleService.createArticle(articleDto);
  }

  @Mutation()
  updateArticle(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('content') content: string,
  ) {
    const articleDto: ArticleDto = { name, content };
    return this.articleService.updateArticle(id, articleDto);
  }
}
