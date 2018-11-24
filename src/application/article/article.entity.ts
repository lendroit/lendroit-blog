import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { ArticlePublishedEvent } from './events/article-published';
import { ArticleCreatedEvent } from './events/article-created.event';

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
    this.apply(new ArticlePublishedEvent(this.id));
    return this;
  }

  createArticle(name: string, content: string) {
    const articleCreatedEvent = new ArticleCreatedEvent(this.id, name, content);
    this.apply(articleCreatedEvent);
  }
}
