import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lifestyle {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column()
  public imageUrl: string;

  @Column()
  public publicId: string;
}
