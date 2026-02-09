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

  async findall() {
    return await this.userRepo.find();
  }
  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id } });
  }
  async create(data: UserDto) {
    const user = this.userRepo.create(data); //due to this password will hash either it will show real pass
    return await this.userRepo.save(user);
  }
  async update(id: number, data: UpdateUserDto) {
    return await this.userRepo.update(id, data);
  }
  async delete(id: number) {
    return await this.userRepo.delete({ id });
  }
}
