import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../api/user.service';
import { UserDto } from '../../api/model/userDto';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  user: UserDto | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.fetchUserData(parseInt(userId, 10));
    }
  }

  fetchUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      }
    });
  }
}
