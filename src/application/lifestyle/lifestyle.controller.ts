import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LifestyleService } from './lifestyle.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('lifestyle')
export class LifestyleController {
  constructor(private readonly lifestyleService: LifestyleService) {}

  @UseGuards(AuthGuard('basic'))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  newImage(@UploadedFile() file) {
    this.lifestyleService.uploadImage(file);
  }

  @Get()
  getImages() {
    return this.lifestyleService.getAllImage();
  }
}
