import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDto } from '../../api/model/userDto';
import { AuthService, CommentListItemDto, CommentsService } from '../../api';


@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  user: UserDto | null = null;
  comments: CommentListItemDto[] = [];

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
    this.authService.profileById(id).subscribe({
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
