import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleDto } from './interfaces/article.dto';
import { Catalog } from '../catalog/catalog.entity';
import { Lifestyle } from '../lifestyle/lifestyle.entity';

@Resolver('Article')
export class ArticleResolver {
  constructor(
    @InjectRepository(Catalog) private readonly catalogRepository: Repository<Catalog>,
    @InjectRepository(Lifestyle) private readonly lifestyleRepository: Repository<Lifestyle>,
    private readonly articleService: ArticleService,
  ) {}

  @Query()
  article(@Args('id') id: number) {
    return this.articleService.findById(id);
  }

  @Query()
  async lifestyle() {
    return this.lifestyleRepository.find();
  }

  @Query()
  async articles() {
    const articleCatalog = await this.catalogRepository.findOne('article');
    const articleIds = articleCatalog.ids;
    return this.articleService.findByIds(articleIds);
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
