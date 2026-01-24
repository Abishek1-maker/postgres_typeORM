import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
//This explicitly names your table "properties"
export class Property {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  description: string;
  //if price is put empty do it wil bydefault 0
  @Column({ default: 0 })
  price: number;
}
