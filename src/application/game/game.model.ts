import { AggregateRoot } from '@nestjs/cqrs';
import { GameCreatedEvent } from './events/game-created.event';

export class Game extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  createGame() {
    this.apply(new GameCreatedEvent());
  }
}
