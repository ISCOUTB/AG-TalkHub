import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BansService } from './bans.service';
import { CreateBanDto } from './dto/create-bans.dto';
import { BanDto } from './dto/ban.dto';
import { BanCreatedResultDto } from './dto/ban-created-result.dto';

@ApiBearerAuth()
@ApiTags('bans')
@Controller('bans')
export class BansController {
  constructor(private readonly bansService: BansService) {}

  @ApiOperation({
    description: 'Get ban by user id',
    operationId: 'getBanByUserId',
  })
  @ApiResponse({
    status: 200,
    description: 'User is banned',
    type: BanDto,
  })
  @ApiResponse({ status: 404, description: 'User is not banned' })
  @Get(':id/user')
  getBanByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.bansService.getBanByUserId(id);
  }

  @ApiOperation({
    description: 'Create a new ban',
    operationId: 'createBan',
  })
  @ApiResponse({
    status: 201,
    description: 'Ban created',
    type: BanCreatedResultDto,
  })
  @ApiResponse({ status: 400, description: 'User not found' })
  @Post()
  async createBan(@Body() createBanDto: CreateBanDto) {
    const result = await this.bansService.insert(createBanDto);
    const dto = new BanCreatedResultDto();
    dto.id_ban = Number(result.lastInsertRowid);
    return dto;
  }
}
