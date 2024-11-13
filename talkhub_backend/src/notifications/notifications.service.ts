import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'src/repository';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { DeleteNotificationDto } from './dto/delete-notification.dto';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationsService extends Repository<
  NotificationDto,
  CreateNotificationDto,
  DeleteNotificationDto
> {
  constructor(
    @Inject('DB_PROD')
    public drizzle: BetterSQLite3Database<typeof schema>,
  ) {
    super(drizzle, schema.notifications);
  }

  async getAllUserNotifications(id: number) {
    return this.drizzle.query.notifications.findMany({
      where: (notifications, { eq }) => eq(schema.notifications.id_user, id),
      with: {
        user: true,
        thread: true,
      },
      columns: {
        id_notification: true,
        id_thread: true,
        id_user: true,
        message: true,
        date: true,
      },
    });
  }

  async deleteById(id: number): Promise<void> {
    this.drizzle
      .delete(schema.notifications)
      .where(eq(schema.notifications.id_notification, id))
      .run();
  }
}
