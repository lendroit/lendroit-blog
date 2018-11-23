import { ICommand } from '@nestjs/cqrs';

export class PublishArticleCommand implements ICommand {
  constructor(public readonly articleId: number) {}
}
