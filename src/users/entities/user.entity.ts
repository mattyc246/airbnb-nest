import { Exclude } from "class-transformer";
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


  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  }
}