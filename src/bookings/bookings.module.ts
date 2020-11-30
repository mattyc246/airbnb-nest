import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { ListingsModule } from 'src/listings/listings.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]), ListingsModule
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
