import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService, BansService, Configuration } from '../../api'; // Import Configuration
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Login component
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  /**
   * Create a new instance of the LoginComponent
   * @param authService Auth service
   * @param formBuilder Angular form builder
   * @param config API Configuration
   * @param router Router
   */
  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly config: Configuration,
    private readonly router: Router,
    private readonly bansService: BansService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Login the user
   */
  login() {
    // Call the login API
    this.authService
      .login({
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || '',
      })
      .subscribe({
        next: (response) => {
          // Assuming the response contains a token (e.g., response.token)
          const token = response.access_token;

          // Store the token in localStorage
          localStorage.setItem('access_token', token);
          const authTokenPayload: { sub: number } = JSON.parse(
            atob(token.split('.')[1])
          );
          // Check if the user is banned
          this.bansService.getBanByUserId(authTokenPayload.sub).subscribe({
            next: (ban) => {
              if (ban) {
                if (ban.id_user === authTokenPayload.sub) {
                    alert('You are banned\nReason: ' + ban.reason + '\nDate: ' + ban.date);
                  return;
                } else {
                  // Update the ApiModule's Configuration with the new token
                  this.config.credentials['bearer'] = () => token;

                  // Navigate to home page after successful login
                  this.router.navigate(['/']).then(() => {
                    window.location.reload();
                  });
                }
              }
            },
          });
        },
        error: (err) => {
          window.alert('Login failed');
        },
      });
  }
}
