import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  CategoriesService,
  CategoryDto,
  ThreadListItemDto,
  ThreadsService,
  VoteListItemDto,
  VotesService,
} from '../../api';


interface ThreadVoteStatus {
  upvotes: number;
  downvotes: number;
}

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
  votes: VoteListItemDto[] = [];
  userThreadVotes: { [id_thread: number]: ThreadVoteStatus } = {};
  constructor(
    private readonly route: ActivatedRoute,
    private readonly threadsService: ThreadsService,
    private readonly categoryService: CategoriesService,
    private readonly votesService: VotesService,
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
  CountThreadVotes(id_thread: number): void {
    this.votesService.getAllThreadVotes(id_thread).subscribe({
      next: (votes) => {
        const upvotes = votes.filter((vote) => vote.type === 1).length;
        const downvotes = votes.filter((vote) => vote.type === 0).length;
        this.userThreadVotes[id_thread] = { upvotes, downvotes};
      },
      error: (error) => {
        console.error('Error fetching votes', error);
      },
    });
  }
  CountThreadDownvotes(id_thread: number): number {
    return this.userThreadVotes[id_thread].downvotes;
  }
  CountThreadUpvotes(id_thread: number): number {
    return this.userThreadVotes[id_thread].upvotes;
  }
  fetchCategoryThreads(id_category: number): void {
    this.threadsService.getThreadsByCategory(id_category).subscribe({
      next: (threads) => {
        this.threads = threads;
        threads.forEach((thread) => {
          this.CountThreadVotes(thread.id_thread);
        });
      },
      error: (error) => {
        console.error('Error fetching threads', error);
      },
    });
  }
}
