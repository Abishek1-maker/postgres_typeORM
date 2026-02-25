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
import { IsOptional } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

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

  //creating hashed user refresh token before saved in database we are keeping it short because
  @Column({ nullable: true })
  hashedrefreshToken: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: true })
  @IsOptional()
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
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
