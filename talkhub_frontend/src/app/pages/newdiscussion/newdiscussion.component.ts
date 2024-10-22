import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ThreadsService, CategoriesService, CategoryListItemDto } from '../../api'; // Import Configuration
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
  categories: CategoryListItemDto[] = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly threadService: ThreadsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.newdiscussionForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      content: ['', [Validators.required, Validators.maxLength(1250), Validators.minLength(10)]],
      categories: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      }
    });
  }
  createThread() {
    this.threadService
      .createThread({
        title: this.newdiscussionForm.value.title || '',
        content: this.newdiscussionForm.value.content || '',
        id_category: parseInt(this.newdiscussionForm.value.categories, 10) || 0,
        publication_date: new Date().toISOString().split('T')[0]
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
