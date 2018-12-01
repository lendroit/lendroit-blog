import { EventObservable, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreEventCommand } from './commands/implementations/store-event.command';
import { ArticleCreated } from './events/article-created.event';

export class ArticleSaga {
  // rename
  storeArticle(events$: EventObservable<any>): Observable<ICommand> {
    console.log('Youhou les events', events$);
    return events$.ofType([ArticleCreated]).pipe(map(event => new StoreEventCommand(event)));
  }
}
