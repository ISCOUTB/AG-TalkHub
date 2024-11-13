import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from 'src/utils/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    let user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    if (user.role === 'admin' && user.password === null) {
      await this.usersService.updatePasswordById(user.id, pass);
      user = await this.usersService.getByEmail(email);
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
