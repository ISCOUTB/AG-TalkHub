import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService, Configuration } from '../../api'; // Import Configuration
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // Add CommonModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrected to styleUrls
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
    private readonly router: Router
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

          // Update the ApiModule's Configuration with the new token
          this.config.credentials['bearer'] = () => token;

          // Redirect to the home page
          this.router.navigate(['/']);
        },
        error: (err) => {
          window.alert('Login failed');
        },
      });
  }
}
