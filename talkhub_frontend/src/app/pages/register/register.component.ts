import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormsModule, 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Configuration } from '../../api';

/**
 * Register component
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  /**
   * Create a new instance of the RegisterComponent
   * @param authService Auth service
   * @param formBuilder Angular form builder
   * @param config API Configuration
   * @param router Router
   */

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      terms: [false, Validators.requiredTrue],
    });
  }


  /**
   * Register the user
   */
  register() {
    // Call the register API
    this.authService
      .register({
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || '',
        name: this.registerForm.value.name || '',
        role: 'regular',
      })
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          window.alert('Register failed');
        },
      });

  }
}
