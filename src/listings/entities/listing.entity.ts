import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

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

  @ManyToOne(() => User, (user: User) => user.listings)
  user: User;
}
