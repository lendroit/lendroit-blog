import { Module } from '@nestjs/common';
import { ArticleModule } from './application/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    ArticleModule,
  ],
})
export class AppModule {}
