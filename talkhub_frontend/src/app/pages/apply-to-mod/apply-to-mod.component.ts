import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, ModaplicationsService, UserDto } from '../../api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-to-mod',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './apply-to-mod.component.html',
  styleUrls: ['./apply-to-mod.component.scss'],
})
export class ApplyToModComponent {
  newApplicationForm: FormGroup;
  user: UserDto | null = null;
  id: number | null = null;

  constructor(
    private readonly modAppsService: ModaplicationsService,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.newApplicationForm = this.formBuilder.group({
      reason: [
        '',
        [
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(10),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.fetchUserRole();
  }

  fetchUserRole() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return;
    }
    const authTokenPayload: { sub: number } = JSON.parse(
      atob(token.split('.')[1])
    );
    this.id = authTokenPayload.sub;
    this.authService.profileById(this.id).subscribe({
      next: (user) => {
        this.user = user;
        if (user.role === 'moderator' || user.role === 'admin') {
          alert('You are already a moderator or admin!');
          this.router.navigate(['/'], { replaceUrl: true });
        }
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      },
    });
  }
  ApplyToMod() {
    this.fetchUserRole();
    this.modAppsService
      .createModaplication({
        id_user: this.id ?? 0,
        reason: this.newApplicationForm.value.reason || '',
        date: new Date().toISOString().split('T')[0],
      })
      .subscribe({
        next: () => {
          alert('Application submitted!');
          this.router.navigate(['/'], { replaceUrl: true });
        },
        error: (error) => {
          console.error('Error submitting application', error);
        },
      });
  }
}
