import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../enums/enum.role';

export class UserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  avatarUrl: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
