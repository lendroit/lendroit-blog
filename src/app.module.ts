import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './application/article/article.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './application/article/article.entity';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sammyt',
      password: 'root',
      database: 'lendroit-blog',
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
