import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { propertydto } from './dto/property.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}
  async findall() {
    return await this.propertyRepo.find();
  }
  async findOne(id: number) {
    const Data = await this.propertyRepo.findOne({ where: { id } });
    if (!Data) throw new NotFoundException(`This ${id} id is not found`);
    return Data;
  }
  async create(dto: propertydto) {
    return await this.propertyRepo.save(dto);
  }
  async update(id: number, dto: UpdatePropertyDto) {
    return await this.propertyRepo.update(id, dto);
  }
  async delete(id: number) {
    const remove_id = await this.propertyRepo.delete({ id });
    if (!remove_id)
      throw new NotFoundException(`Property with ${id} is not found`);
    await this.propertyRepo.delete(id);

    return { message: `Property with ID ${id} has been deleted successfully` };
  }
}
