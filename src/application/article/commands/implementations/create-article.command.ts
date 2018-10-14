import { ICommand } from '@nestjs/cqrs';

export class CreateArticleCommand implements ICommand {
  constructor(public readonly articleName: string) {}
}
