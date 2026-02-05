import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { propertyfeatures } from './propertyfeatures.entity';
import { User } from './user.entity';

@Entity()
//This explicitly names your table "property"
export class Property {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;
  @OneToOne(
    () => propertyfeatures,
    (propertyfeatures) => propertyfeatures.property,
  )
  propertyFeatures: propertyfeatures;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToMany(() => User, (user) => user.likesProperties)
  likedBy: User[];
}
