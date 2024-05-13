import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signInDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password, isRemember } = signInDto;

    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payload = { id: user.id, email: user.email };

    return {
      id: user.id,
      email: user.email,
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: isRemember ? '24h' : '1h',
      }),
    };
  }
}
