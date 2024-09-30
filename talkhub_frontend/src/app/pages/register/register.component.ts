import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  termsAccepted: boolean = false;

   onSubmit(event: Event) {
    event.preventDefault();

    if (this.password !== this.confirmPassword) {
      alert('Passwords must match.');
      return;
    }

    if (!this.termsAccepted) {
      alert('You must accept the terms and policy.');
      return;
    }

    // Proceed with form submission logic
    console.log('Form submitted successfully!', {
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }
}
