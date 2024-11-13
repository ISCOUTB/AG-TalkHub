/**
 * Talkhub API
 * This is a forum API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { NotificationThreadListItemDto } from './notificationThreadListItemDto';
import { NotificationUserListItemDto } from './notificationUserListItemDto';


export interface NotificationListItemDto { 
    /**
     * The notification\'s id
     */
    id_notification: number;
    /**
     * The notification\'s date
     */
    date: string;
    /**
     * The notification\'s message
     */
    message: string;
    /**
     * The notification\'s user
     */
    user: NotificationUserListItemDto;
    /**
     * The notification\'s thread
     */
    thread: NotificationThreadListItemDto;
}
