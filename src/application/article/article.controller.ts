import { Get, Post, Body, Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './interfaces/article.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  root(): string {
    return this.articleService.root();
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  async createArticle(@Body() createArticleDto: ArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }

  @Patch('/:id')
  @UseGuards(AuthenticationGuard)
  async updateArticle(@Body() updateArticleDto: ArticleDto, @Param() params) {
    return await this.articleService.updateArticle(params.id, updateArticleDto);
  }
}
