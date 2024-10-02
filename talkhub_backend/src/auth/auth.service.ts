import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from 'src/utils/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    // Validate the user's password
    const isPasswordValid = await this.hashingService.comparePasswords(
      pass,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}