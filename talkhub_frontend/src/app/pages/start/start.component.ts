import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThreadListItemDto, ThreadsService } from '../../api';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  threads: ThreadListItemDto[] = [];

  constructor(private readonly threadsService: ThreadsService) {}

  ngOnInit(): void {
    this.threadsService.getAll().subscribe({
      next: (threads) => {
        this.threads = threads;
      },
      error: (error) => {
        console.error('Error fetching threads', error);
      },
    });
  }

}
