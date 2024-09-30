import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories = [
    {
      id: 1,
      name: 'Movies',
      description: 'Discuss the latest movies and classics.',
      lastUpdated: 'March 1, 2024',
    },
    {
      id: 2,
      name: 'TV Shows',
      description: 'Talk about your favorite TV shows.',
      lastUpdated: 'September 2, 2024',
    },
    {
      id: 3,
      name: 'Video Games',
      description: 'Share thoughts on the latest video games.',
      lastUpdated: 'July 15, 2024',
    },
    {
      id: 4,
      name: 'Technology',
      description: 'Discuss the latest in tech and gadgets.',
      lastUpdated: 'August 10, 2024',
    },
    // Add more category objects as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}