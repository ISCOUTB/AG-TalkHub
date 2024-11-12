import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ThreadListItemDto,
  ThreadsService,
  VoteListItemDto,
  VotesService,
} from '../../api';

interface ThreadVotes {
  upvotes: number;
  downvotes: number;
}

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent {
  threads: ThreadListItemDto[] = [];
  votes: VoteListItemDto[] = [];
  userVotes: { [id_thread: number]: ThreadVotes } = {};
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly votesService: VotesService
  ) {}

  ngOnInit(): void {
    this.threadsService.getAllThreads().subscribe({
      next: (threads) => {
        this.threads = threads.sort((a, b) => this.CountThreadVotes(a.id_thread) - this.CountThreadVotes(b.id_thread));
      },
      error: (error) => {
        console.error('Error fetching threads', error);
      },
    });
  }
  CountThreadVotes(id_thread: number): number {
    this.votesService.getAllThreadVotes(id_thread).subscribe({
      next: (votes) => {
        const upvotes = votes.filter((vote) => vote.type === 1).length;
        const downvotes = votes.filter((vote) => vote.type === 0).length;
        this.userVotes[id_thread] = { upvotes, downvotes };
        this.showNetVotes(id_thread);
        return upvotes - downvotes;
      },
      error: (error) => {
        console.error('Error fetching votes', error);
      },
    });
    return 0;
  }
  showNetVotes(id_thread: number): number {
    return this.userVotes[id_thread].upvotes - this.userVotes[id_thread].downvotes;
  }
}
