import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  location: string;

  @Column()
  price: number;

  @Column()
  noOfGuests: number;
}
