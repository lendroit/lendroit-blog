import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { StoreEventCommand } from '../implementations/store-event.command';
import { Event } from '../../../../infrastructure/event/event.entity';

@CommandHandler(StoreEventCommand)
export class StoreEventHandler implements ICommandHandler<StoreEventCommand> {
  async execute(storeEventCommand: StoreEventCommand) {
    const storedEvent = new Event();
    storedEvent.payload = storeEventCommand;
    // storedEvent.aggregateId = this.id;
    const { constructor } = Object.getPrototypeOf(event);
    storedEvent.className = constructor.name;
    // getRepository(Event).save(storedEvent);
  }
}
