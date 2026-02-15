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
  // SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { UserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  //jwt get profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getprofile(@Req() req: any) {
    return this.userservice.findOne(req.user.id);
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

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userservice.delete(id);
  }
}
