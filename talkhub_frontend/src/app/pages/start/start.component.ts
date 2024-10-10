import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThreadListItemDto, ThreadsService } from '../../api';
import { CategoryListItemDto, CategoriesService } from '../../api';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  threads: ThreadListItemDto[] = [];
  categories: CategoryListItemDto[] = [];
  constructor(private readonly threadsService: ThreadsService, private readonly categoriesService: CategoriesService) {}
  

  ngOnInit(): void {
    this.threadsService.getAllThreads().subscribe({
      next: (threads) => {
        this.threads = threads;
      },
      error: (error) => {
        console.error('Error fetching threads', error);
      },
    });
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      },
  });
}
}