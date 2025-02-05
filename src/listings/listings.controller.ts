import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from 'src/authentication/interfaces/requestWithUser.interface';
import { TransformInterceptor } from 'src/users/transform.interceptor';

@Controller('listings')
@UseInterceptors(TransformInterceptor)
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() listing: CreateListingDto, @Req() request: RequestWithUser) {
    return this.listingsService.create(listing, request.user);
  }

  @Get('/me')
  @UseGuards(JwtAuthenticationGuard)
  findAllByMe(@Req() request: RequestWithUser) {
    return this.listingsService.findAllByUser(request.user)
  }

  @Get()
  findAll() {
    return this.listingsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }
}
