import { Point } from '../../../models/src/models/geojson';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  handled: boolean;
  @Column({
    length: 100,
  })
  wasteType: string;
  @Column()
  location: Point;
  @Column('double')
  occurence: number;
}
