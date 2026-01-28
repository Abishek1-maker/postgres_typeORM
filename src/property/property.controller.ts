import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { propertydto } from './dto/property.dto';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  //In GET ONLY MIDDLEWARE CHECK
  @Get()
  findAll() {
    console.log('just checking is middleware working!!');
    return this.propertyService.findall();
  }

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
