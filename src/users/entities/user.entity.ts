import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm"
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
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  }
}