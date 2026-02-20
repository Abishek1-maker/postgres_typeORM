/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { UserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}
  @Get()
  findAll() {
    return this.userservice.findall();
  }

  //jwt get profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getprofile(@Req() req: any) {
    return this.userservice.findOne(req.user.id);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userservice.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: UserDto,
  ) {
    return this.userservice.create(body);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.userservice.update(id, body);
  }

  //Need to be in this lineup ROLE BASED
  @Roles(Role.ADMIN, Role.EDITOR)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userservice.delete(id);
  }
}
