import { ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateGameCommand } from '../implementation/create-game.command';
import { Game } from '../../game.model';

export class CreateGameHandler implements ICommandHandler<CreateGameCommand> {
  constructor(private readonly publisher: EventPublisher) {}
  execute(command: CreateGameCommand, resolve: (value?) => void) {
    const GameModel = this.publisher.mergeClassContext(Game);
    const newGame = new GameModel('Croute');
  }
}
