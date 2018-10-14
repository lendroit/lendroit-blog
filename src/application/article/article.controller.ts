import { Get, Post, Body, Controller } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './interfaces/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  root(): string {
    return this.articleService.root();
  }

  @Post()
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }
}
