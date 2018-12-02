import { InjectRepository } from '@nestjs/typeorm';
import { Lifestyle } from './lifestyle.entity';
import { Repository } from 'typeorm';

// tslint:disable-next-line
const env = require('dotenv');
env.config();
// tslint:disable-next-line
const cloudinary = require('cloudinary').v2;

export class LifestyleService {
  constructor(
    @InjectRepository(Lifestyle) private readonly lifestyleRepository: Repository<Lifestyle>,
  ) {}
  uploadImage(file) {
    cloudinary.uploader
      .upload_stream({ resource_type: 'image' }, (_error, result) => {
        const lifestyle = new Lifestyle();
        lifestyle.publicId = result.public_id;
        lifestyle.imageUrl = result.url;
        this.lifestyleRepository.save(lifestyle);
      })
      .end(file.buffer);
  }

  getAllImage() {
    return this.lifestyleRepository.find();
  }
}
