import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDto } from '../../api/model/userDto';
import {
  AuthService,
  CommentListItemDto,
  CommentsService,
  UpdateUserDto,
} from '../../api';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: UserDto | null = null;
  comments: CommentListItemDto[] = [];
  id: number | null = null;
  profileForm: FormGroup;
  editBio: boolean = false;
  updatedUser: UpdateUserDto | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly commentsService: CommentsService,
    private readonly formBuilder: FormBuilder
  ) {
    this.profileForm = this.formBuilder.group({
      content: ['', [Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    const id_user = this.route.snapshot.paramMap.get('id');
    if (id_user) {
      this.fetchUserData();
      this.fetchUserComments(parseInt(id_user, 10));
    }
  }

  toggleEditBio(): void {
    this.editBio = !this.editBio;
    if (this.editBio && this.user?.bio) {
      this.profileForm.controls['content'].setValue(this.user.bio);
    } else {
      this.profileForm.reset();
    }
  }

  saveBio(): void {
    if (this.profileForm.invalid) {
      return;
    } else {
      this.updateUserProfileData();
    }
  }

  updateUserProfileData() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return;
    }
    const authTokenPayload: { sub: number; email: string; exp: number } =
      JSON.parse(atob(token.split('.')[1]));
    this.id = authTokenPayload.sub;
    this.authService.profileById(this.id).subscribe({
      next: (user) => {
        this.user = user;
        this.updatedUser = {
          name: user.name,
          email: user.email,
          role: user.role,
          bio: this.profileForm.value.content || '',
        };
        this.authService
          .updateProfileById(authTokenPayload.sub, this.updatedUser)
          .subscribe({
            next: () => {
              this.editBio = false;
              window.location.reload();
            },
            error: (error) => {
              console.error('Error updating user data', error);
            },
          });
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      },
    });
  }

  fetchUserData(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return;
    }
    const authTokenPayload: { sub: number; email: string; exp: number } =
      JSON.parse(atob(token.split('.')[1]));
    this.id = authTokenPayload.sub;
    this.authService.profileById(this.id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      },
    });
  }

  fetchUserComments(id: number): void {
    this.commentsService.getAllUserComments(id).subscribe({
      next: (comments) => {
        this.comments = Array.isArray(comments) ? comments : [comments];
      },
      error: (error) => {
        console.error('Error fetching commets', error);
      },
    });
  }
}
