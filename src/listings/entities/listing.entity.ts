import { Expose } from "class-transformer";
import { Booking } from "src/bookings/entities/booking.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"

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

  @OneToMany(() =>  Booking, (booking: Booking) => booking.listing)
  bookings: Booking[]

  @ManyToOne(() => User, (user: User) => user.listings)
  user: User;
}
