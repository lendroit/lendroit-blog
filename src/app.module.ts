import { Module } from '@nestjs/common';
import { ArticleModule } from './application/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './application/user/user.module';
import { AuthenticationModule } from './application/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    UserModule,
    AuthenticationModule,
    ArticleModule,
  ],
})
export class AppModule {}
