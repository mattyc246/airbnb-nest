import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>
  ){}

  async create(listing: CreateListingDto, user: User): Promise<Listing> {
    try {
      let newListing = this.listingsRepository.create({...listing, user: user})
      await this.listingsRepository.save(newListing)
      return newListing;
    } catch (error) {
      if(error?.code === PostgresErrorCode.UniqueViolation){
        throw new HttpException('Name already exists', HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllByUser(user: User): Promise<Listing[]> {
    return await this.listingsRepository.find({ where: { user: user }})
  }

  findAll() {
    return this.listingsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  async update(id: number, listing: UpdateListingDto) {
    await this.listingsRepository.update(id, listing)
    const updatedListing = this.listingsRepository.findOne(id)
    if(updatedListing){
      return updatedListing
    }
    throw new HttpException('Listing not found', HttpStatus.NOT_FOUND)
  }

  remove(id: number) {
    return this.listingsRepository.delete(id);
  }
}
