import { Listing } from "src/listings/entities/listing.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled"
}

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

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  paymentStatus: PaymentStatus;

  @ManyToOne(() => User, (user: User) => user.bookings)
  user: User;

  @ManyToOne(() => Listing, (listing: Listing) => listing.bookings)
  listing: Listing;
}
