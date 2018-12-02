import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lifestyle } from './lifestyle.entity';
import { LifestyleController } from './lifestyle.controller';
import { LifestyleService } from './lifestyle.service';

@Module({
  controllers: [LifestyleController],
  providers: [LifestyleService],
  imports: [TypeOrmModule.forFeature([Lifestyle])],
})
export class LifestyleModule {}
