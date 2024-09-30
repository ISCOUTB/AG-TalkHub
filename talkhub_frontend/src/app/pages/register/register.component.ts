import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  onSubmit(event: Event) {
    event.preventDefault(); // Prevenir el envío del formulario
    const form = (event.target as HTMLFormElement);
    const passwordInput = form.querySelector('#password') as HTMLInputElement;
    const confirmPasswordInput = form.querySelector('#confirmPassword') as HTMLInputElement;

    // Verifica que las contraseñas coincidan
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert('Passwords must match.');
      return;
    }

    // Si todo está bien, dejar que el formulario se envíe
    console.log('Form submitted successfully!');
  }
}
