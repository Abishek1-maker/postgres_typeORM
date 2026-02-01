import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { propertydto } from './dto/property.dto';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { LoggerInterceptor } from 'src/interceptors/logger/logger.interceptor';
import { TranformInterceptor } from 'src/interceptors/tranform/tranform.interceptor';
import { CacheInterceptor } from 'src/interceptors/cache/cache.interceptor';

@UseGuards(AuthGuard)
@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}
  @Get()
  @UseInterceptors(TranformInterceptor, CacheInterceptor)
  findAll() {
    return this.propertyService.findall();
  }

  @UseInterceptors(LoggerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: propertydto,
  ) {
    return this.propertyService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.delete(id);
  }
}
