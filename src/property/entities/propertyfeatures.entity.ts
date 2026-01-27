import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class propertyfeatures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bedrooms: number;

  @Column()
  parkingSpots: number;

  @Column()
  area: number;
  @Column()
  hasSwimmingpool: boolean;

  @Column()
  hasGardenYard: boolean;

  @Column()
  hasBalcony: boolean;

  //target side is property entity
  @OneToOne(() => Property, (Property) => Property.propertyFeatures)

  //This is for in which side of this 1 to 1 rltinship contain the foreign key
  @JoinColumn()
  property: Property;
}
