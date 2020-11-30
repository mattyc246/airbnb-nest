import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from 'src/listings/entities/listing.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>
  ){}
  async create(createBookingDto: CreateBookingDto, listing: Listing, user: User) {
    try {
      const newBooking = this.bookingsRepository.create({...createBookingDto, user: user, listing: listing})
      await this.bookingsRepository.save(newBooking)
      return newBooking;
    } catch(error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findAll(user: User) {
    return `This action returns all users bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
