import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from 'src/authentication/interfaces/requestWithUser.interface';
import { ListingsService } from 'src/listings/listings.service';
import { TransformInterceptor } from 'src/users/transform.interceptor';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
@UseInterceptors(TransformInterceptor)

export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly listingsService: ListingsService
    ) {}

  @Post(':id')
  @UseGuards(JwtAuthenticationGuard)
  async create(
    @Param('id') listingId: string, @Body() createBookingDto: CreateBookingDto, @Req() request: RequestWithUser
    ) {
    const listing = await this.listingsService.findOne(listingId)
    if(!listing){
      throw new HttpException('No listing found with this id', HttpStatus.NOT_FOUND)
    }
    return this.bookingsService.create(createBookingDto, listing, request.user);
  }

  @Get('/me')
  @UseGuards(JwtAuthenticationGuard)
  findAll(@Req() request: RequestWithUser) {
    return this.bookingsService.findAllUserBookings(request.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.bookingsService.cancel(+id);
  }
}
