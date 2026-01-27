import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { propertyfeatures } from './propertyfeatures.entity';

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
  //this oneToone take 2 parameters the Target and the reverse side
  //in 1st  we need to returns the type of this relationship
  //
  @OneToOne(
    () => propertyfeatures,
    //Which it one parameter which is an instance(stored actual data) and return
    // the field from the property
    // feature that is (to connect)) in this one to one that is with the property
    //the reason for reverse funtion is for navigation towdirectional
    (propertyfeatures) => propertyfeatures.property,
    //if we remove the property datas(instance) the database automatically remove
    //  linked data from database
    //we if we update then the dbms automatically update the foreign key
    { cascade: true },
    // {cascade : "update"} we have cascade only for update if we delete the property then even
    //linked propertyfeatures will store the update instance
  )
  propertyFeatures: propertyfeatures;
}
