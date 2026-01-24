import { PartialType } from '@nestjs/mapped-types';
import { propertydto } from './property.dto';

export class UpdatePropertyDto extends PartialType(propertydto) {}
