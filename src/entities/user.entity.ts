/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';
import * as bcrypt from 'bcrypt';

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

  @Column({ nullable: true })
  password: string;
  @Column()
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Property, (Property) => Property.user)
  properties: Property[];

  @ManyToMany(() => Property, (Property) => Property.likedBy)
  @JoinTable({ name: 'user_liked_properties' })
  likesProperties: Property[];

  @BeforeInsert()
  async hashpassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
