/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class propertydto {
  @IsString()
  @Length(3, 10, { message: 'Should be charctor between 3 and 10' })
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  price: number;
}
