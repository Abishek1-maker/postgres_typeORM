/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  //THIS IS FOR STORED HASHED refreshToken
  async updateHashedRefreshToken(userId: number, hashedrefreshToken: string) {
    return await this.userRepo.update({ id: userId }, { hashedrefreshToken });
  }

  async findall() {
    return await this.userRepo.find();
  }

  //passed the hashed refresh token because we need inside our validate function()
  async findOne(id: number) {
    return await this.userRepo.findOne({
      where: { id },
      select: [
        'id',
        'firstName',
        'lastName',
        'avatarUrl',
        'createdAt',
        'role',
        'hashedrefreshToken',
      ],
    });
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  async create(data: UserDto) {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }
  async update(id: number, data: UpdateUserDto) {
    return await this.userRepo.update(id, data);
  }
  async delete(id: number) {
    return await this.userRepo.delete({ id });
  }
}
