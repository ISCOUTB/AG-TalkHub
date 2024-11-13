import {
  Body,
  Controller,
  Delete,
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
import { NotificationsService } from './notifications.service';
import { NotificationListItemDto } from './dto/notification-list-item.dto';
import { NotificationCreatedResultDto } from './dto/notification-created-result.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';

@ApiBearerAuth()
@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({
    description: "Get all user's notifications",
    operationId: 'getAllUserNotifications',
  })
  @ApiResponse({
    status: 200,
    description: 'Notifications found',
    type: NotificationListItemDto,
  })
  @Get(':id/users')
  getAllUserNotifications(@Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.getAllUserNotifications(id);
  }

  @ApiOperation({
    description: 'Create a new notification',
    operationId: 'createNotification',
  })
  @ApiResponse({
    status: 201,
    description: 'Notification created',
    type: NotificationCreatedResultDto,
  })
  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const result = await this.notificationsService.insert(
      createNotificationDto,
    );
    const dto = new NotificationCreatedResultDto();
    dto.id_notification = Number(result.lastInsertRowid);
    return dto;
  }

  @ApiOperation({
    description: "Delete a user's notifications",
    operationId: 'deleteUserNotifications',
  })
  @ApiResponse({
    status: 200,
    description: 'Notifications deleted',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    this.notificationsService.deleteById(id);
  }
}
