import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticlePublished } from './events/article-published';
import { ArticleCreated } from './events/article-created.event';
import { AggregateRoot } from '../AggregateRoot';

@Entity()
export class Article extends AggregateRoot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isPublished: boolean;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  publishArticle() {
    this.isPublished = !this.isPublished;
    this.apply(new ArticlePublished(this.id));
    return this;
  }

  createArticle(name: string, content: string) {
    const articleCreatedEvent = new ArticleCreated({ id: this.id, name, content });
    this.apply(articleCreatedEvent);
  }

  onArticleCreated(event: ArticleCreated) {
    this.id = event.id;
    this.name = event.name;
    this.content = event.content;
  }
}
