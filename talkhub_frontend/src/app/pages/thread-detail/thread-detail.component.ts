import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommentListItemDto, ThreadsService, CommentsService } from '../../api';
import { ThreadDto } from '../../api/model/threadDto';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-thread-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss'],
})
export class ThreadDetailComponent implements OnInit {
  thread: ThreadDto | null = null;
  comments: CommentListItemDto[] = [];
  commentForm: FormGroup;
  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly threadsService: ThreadsService,
    private readonly formBuilder: FormBuilder,
    private readonly commentsService: CommentsService,
    private readonly router: Router,
  ) {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    const id_thread = this.route.snapshot.paramMap.get('id');
    if (id_thread) {
      this.fetchThreadDetails(parseInt(id_thread, 10));
      this.fetchThreadComments(parseInt(id_thread, 10));
    }
  }

  fetchThreadDetails(id_thread: number): void {
    this.threadsService.getThreadById(id_thread).subscribe({
      next: (thread) => {
        this.thread = thread;
      },
      error: (error) => {
        console.error('Error fetching thread details', error);
      },
    });
  }

  fetchThreadComments(id_thread: number): void {
    this.threadsService.getThreadComments(id_thread).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error fetching comments', error);
      },
    });
  }

  createComment() {
    this.commentsService
      .createComment({
        content: this.commentForm.value.content || '',
        id_thread: parseInt(this.route.snapshot.params['id'], 10) || 0,
        publication_date: new Date().toISOString().split('T')[0],
      })
      .subscribe({
        next: () => {
            this.fetchThreadComments(parseInt(this.route.snapshot.params['id'], 10));
            this.commentForm.reset();
        },
        error: (error) => {
          console.error('Error creating comment', error);
        },
      });
  }
}
