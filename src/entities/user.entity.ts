import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { Role } from '../../enums/enum.role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  avatarUrl: string;

  //Automatically set the value of this tmi insertion time
  @CreateDateColumn()
  //   @UpdateDateColumn()
  // @DeleteDateColumn
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => Property, (Property) => Property.user)
  properties: Property[];
}
