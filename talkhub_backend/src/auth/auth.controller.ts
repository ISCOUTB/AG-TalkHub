import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './public-route.metadata';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { RunResult } from 'better-sqlite3';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Login to the application',
    operationId: 'login',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Login successful', type: TokenDto })
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({
    description: 'Get user profile data by id',
    operationId: 'profileById',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Profile data', type: UserDto })
  @Get('profileById/:id')
  getProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserProfileById(id);
  }

  @Public()
  @ApiOperation({
    description: 'Register a new user',
    operationId: 'register',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    return this.userService.insert(registerDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Update user profile data',
    operationId: 'updateProfileById',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    description: 'Profile Updated',
    type: UpdateUserDto,
  })
  @Patch('updateProfileById/:id')
  async updateProfileById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<RunResult> {
    return this.userService.updateById(id, data);
  }
}
