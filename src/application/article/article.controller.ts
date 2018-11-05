import { Get, Post, Body, Controller, Patch, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './interfaces/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  root(): string {
    return this.articleService.root();
  }

  @Post()
  async createArticle(@Body() createArticleDto: ArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }

  @Patch('/:id')
  async updateArticle(@Body() updateArticleDto: ArticleDto, @Param() params) {
    return await this.articleService.updateArticle(params.id, updateArticleDto);
  }
}
