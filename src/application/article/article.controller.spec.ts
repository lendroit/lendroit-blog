import { Test } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CQRSModule } from '@nestjs/cqrs';

describe('Article controller', () => {
  let articleService: ArticleService;
  let articleController: ArticleController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CQRSModule],
      providers: [ArticleService],
      controllers: [ArticleController],
    }).compile();
    articleService = module.get<ArticleService>(ArticleService);
    articleController = module.get<ArticleController>(ArticleController);
  });

  describe('findAll', () => {
    it('should return an article', async () => {
      const result = 'Un article';
      jest.spyOn(articleService, 'root').mockImplementation(() => result);
      expect(await articleController.root()).toBe(result);
    });
  });
});
