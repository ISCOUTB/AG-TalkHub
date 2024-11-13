import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationListItemDto, NotificationsService } from '../../api';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  notifications: NotificationListItemDto[] = [];
  id: number | null = null;
  isUser = false;
  
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}
  
  ngOnInit(): void {
    const id_user = this.route.snapshot.paramMap.get('id');
    if (id_user) {
      this.checkAuth();
      this.loadNotifications(parseInt(id_user, 10)); 
    }
  }
  checkAuth() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.isUser = false;
      return;
    }

    const authTokenPayload: { sub: number} =
      JSON.parse(atob(token.split('.')[1]));
    this.id = authTokenPayload.sub;
    const id_user = this.route.snapshot.paramMap.get('id');
    if (id_user) {
      if (parseInt(id_user, 10) === this.id) {
        this.isUser = true;
      }
    }
    if(!this.isUser){
      alert('You are not authorized to view this page');
      this.router.navigate(['/'], { replaceUrl: true });
    }

  }
  loadNotifications(id: number): void {
    this.notificationsService.getAllUserNotifications(id).subscribe({
      next: (notifications) => {
        this.notifications = Array.isArray(notifications)
          ? notifications
          : [notifications];
      },
      error: (error) => {
        console.error('Error fetching notifications', error);
      },
    });
  }

  deleteNotification(id_notification: number): void {
    this.notificationsService.deleteUserNotifications(id_notification).subscribe({
      next: () => {
        const user_id = this.route.snapshot.paramMap.get('id');
        if (user_id) {
          this.loadNotifications(parseInt(user_id, 10));
        }
      },
      error: (error) => {
        console.error('Error deleting notification', error);
      },
    });
  }
}
