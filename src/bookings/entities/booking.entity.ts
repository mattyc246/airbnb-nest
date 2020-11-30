import { Listing } from "src/listings/entities/listing.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  @Column()
  noOfGuests: number;

  @ManyToOne(() => User, (user: User) => user.bookings)
  user: User;

  @ManyToOne(() => Listing, (listing: Listing) => listing.bookings)
  listing: Listing;
}
