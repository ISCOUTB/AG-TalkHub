import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrected to styleUrls
})
export class LoginComponent {

}
