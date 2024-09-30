import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-threads',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss'],
})
export class ThreadsComponent implements OnInit {
  threads = [
    {
      id: 1,
      title: 'Batman vs Superman',
      author: 'User123',
      date: 'March 1, 2024',
      category: 'Superheroes',
      content: 'Who would win in a fight between Batman and Superman?',
    },
    {
      id: 2,
      title: 'YouTube vs Twitch',
      author: 'User456',
      date: 'September 2, 2024',
      category: 'Social Media',
      content: 'Which platform is better for content creators?',
    },
    // Add more thread objects as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
