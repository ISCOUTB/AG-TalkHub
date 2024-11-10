import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDto } from '../../api/model/userDto';
import { AuthService } from '../../api';

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
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const id_user = this.route.snapshot.paramMap.get('id');
    if (id_user) {
      this.fetchUserData(parseInt(id_user, 10));
    }
  }

  fetchUserData(id: number): void {
    this.authService.profileById(id).subscribe({
      next: (user) => {
        this.user = user;
        console.log('API Response:', user);
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      }
    });
  }
}
