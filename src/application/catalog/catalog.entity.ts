import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Catalog {
  @PrimaryColumn()
  entityName: string;
  @Column('json')
  ids: number[];
}
