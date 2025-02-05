import { Exclude } from "class-transformer";
import { Booking } from "src/bookings/entities/booking.entity";
import { Listing } from "src/listings/entities/listing.entity";
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from "typeorm"
const bcrypt = require('bcrypt')

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Listing, (listing: Listing) => listing.user)
  listings: Listing[]

  @OneToMany(() => Booking, (booking: Booking) => booking.user)
  bookings: Booking[]


  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  }
}