import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existUser) {
      throw new BadRequestException(`User with email ${createUserDto.email} already exists`);
    }

    const saltOrRounds = 10;
    const hashPass = await bcrypt.hash(createUserDto.password, saltOrRounds);

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashPass,
      },
    });
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
}
