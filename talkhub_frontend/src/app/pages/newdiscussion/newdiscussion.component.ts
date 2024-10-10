import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ThreadsService } from '../../api'; // Import Configuration
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newdiscussion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './newdiscussion.component.html',
  styleUrls: ['./newdiscussion.component.scss'],
})
export class NewdiscussionComponent {
  newdiscussionForm: FormGroup;

  constructor(
    private readonly threadService: ThreadsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.newdiscussionForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categories: ['', Validators.required],
    });
  }

  createThread() {
    this.threadService
      .createThread({
        title: this.newdiscussionForm.value.title || '',
        content: this.newdiscussionForm.value.content || '',
        id_category: this.newdiscussionForm.value.categories || '',
        publication_date: new Date().toISOString(),
        id_user: 1,
      })
      .subscribe({
        next: (response) => {
          this.router.navigate(['/threads', response.id_thread]);
        },
        error: (error) => {
          console.error('Error creating thread', error);
        },
      });
  }
}
