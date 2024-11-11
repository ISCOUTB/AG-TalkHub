import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDto } from '../../api/model/userDto';
import { AuthService, CommentListItemDto, CommentsService } from '../../api';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  user: UserDto | null = null;
  comments: CommentListItemDto[] = [];
  id: number | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly commentsService: CommentsService,
  ) {}

  ngOnInit(): void {
    const id_user = this.route.snapshot.paramMap.get('id');
    if (id_user) {
      this.fetchUserData(parseInt(id_user, 10));
      this.fetchUserComments(parseInt(id_user, 10))
    }
  }

  fetchUserData(id: number): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return;
    }
    const authTokenPayload: {sub: number, email: string, exp: number} = JSON.parse(atob(token.split('.')[1]));
    this.id = authTokenPayload.sub;

    this.authService.profileById(this.id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      }
    });
  }

  fetchUserComments(id: number): void {
    this.commentsService.getAllUserComments(id).subscribe({
      next: (comments) => {
        this.comments = Array.isArray(comments) ? comments : [comments];
      },
      error: (error) => {
        console.error('Error fetching commets', error)
      },
    })
  }
}
