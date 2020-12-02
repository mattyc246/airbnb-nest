import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from 'src/listings/entities/listing.entity';
import { User } from 'src/users/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, PaymentStatus } from './entities/booking.entity';

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

  async findAllUserBookings(user: User) {
    return await this.bookingsRepository.find({where: {user: user}, relations: ['listing']});
  }

  async findAllUserListingBookings(user: User){
    return await getRepository(Booking)
    .createQueryBuilder("booking")
    .leftJoinAndSelect("booking.listing", "listing")
    .where("listing.user = :user", {user: user.id})
    .getMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  async cancel(id: number) {
    return await this.bookingsRepository.update(id, {paymentStatus: PaymentStatus.CANCELLED})
  }
}
