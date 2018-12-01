import { ICommand, IEvent } from '@nestjs/cqrs';

export class StoreEventCommand implements ICommand {
  constructor(public readonly event: IEvent) {}
}
