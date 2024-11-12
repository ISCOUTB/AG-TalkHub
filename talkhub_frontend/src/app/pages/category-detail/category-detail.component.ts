import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  CategoriesService,
  CategoryDto,
  ThreadListItemDto,
  ThreadsService,
} from '../../api';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent {
  category: CategoryDto | null = null;
  threads: ThreadListItemDto[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly threadsService: ThreadsService,
    private readonly categoryService: CategoriesService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id_category = this.route.snapshot.paramMap.get('id');
    if (id_category) {
      this.fetchCategoryDetails(parseInt(id_category, 10));
      this.fetchCategoryThreads(parseInt(id_category, 10));
    }
  }

  fetchCategoryDetails(id_category: number): void {
    this.categoryService.getCategoryById(id_category).subscribe({
      next: (category) => {
        this.category = category;
      },
      error: (error) => {
        console.error('Error fetching category details', error);
      },
    });
  }

  fetchCategoryThreads(id_category: number): void {
    this.threadsService.getThreadsByCategory(id_category).subscribe({
      next: (threads) => {
        this.threads = threads;
      },
      error: (error) => {
        console.error('Error fetching threads', error);
      },
    });
  }
}
