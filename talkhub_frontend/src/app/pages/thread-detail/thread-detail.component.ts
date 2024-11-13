import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  CommentListItemDto,
  ThreadsService,
  CommentsService,
  VoteListItemDto,
  VotesService,
  CreateVoteDto,
  UpdateVoteDto,
  ReportsService,
  BansService,
  NotificationsService,
} from '../../api';
import { ThreadDto } from '../../api/model/threadDto';
import { ReportDto } from '../../api/model/reportDto';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';

type VoteType = 0 | 1 | null;

interface CommentVoteStatus {
  upvotes: number;
  downvotes: number;
  userVoteType: VoteType;
}

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
  reportForm: FormGroup;
  votes: VoteListItemDto[] = [];
  isReportModalOpen = false;
  ReportedUser: ReportDto | null = null;
  userVotedThread = false;
  userVotedComment = false;
  isLoggedIn = false;
  id: number | null = null;
  user = JSON.parse(localStorage.getItem('user') ?? '{}');
  userCommentVotes: { [id_comment: number]: CommentVoteStatus } = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly threadsService: ThreadsService,
    private readonly formBuilder: FormBuilder,
    private readonly commentsService: CommentsService,
    private readonly votesService: VotesService,
    private readonly reportsService: ReportsService,
    private readonly bansService: BansService,
    private readonly notificationsService: NotificationsService
  ) {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.reportForm = this.formBuilder.group({
      reason: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    const id_thread = this.route.snapshot.paramMap.get('id');
    if (id_thread) {
      this.fetchThreadDetails(parseInt(id_thread, 10));
      this.fetchThreadComments(parseInt(id_thread, 10));
      this.checkAuth();
      this.fetchThreadVotes(parseInt(id_thread, 10));
      this.fetchCommentVotes(parseInt(id_thread, 10));
      this.countUpvotes();
      this.countDownvotes();
    }
  }

  checkAuth() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.isLoggedIn = false;
      return;
    }
    const authTokenPayload: { sub: number; exp: number } = JSON.parse(
      atob(token.split('.')[1])
    );
    const expiryTimestampSeconds = authTokenPayload.exp;
    this.id = authTokenPayload.sub;
    const expiryTimestampMilliSeconds = expiryTimestampSeconds * 1000;
    this.isLoggedIn = expiryTimestampMilliSeconds > Date.now();
  }
  // Thread and Comment functions
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
        comments.forEach((comment) =>
          this.fetchCommentVotes(comment.id_comment)
        );
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
          if (this.thread) {
            this.notificationsService
              .createNotification({
                id_user: this.thread.user.id,
                id_thread: parseInt(this.route.snapshot.params['id'], 10),
                message: 'New comment on your thread',
                date: new Date().toISOString().split('T')[0],
              })
              .subscribe({
                next: () => {
                  console.log('Notification created successfully');
                },
                error: (error) => {
                  console.error('Error creating notification', error);
                },
              });
          }
          this.fetchThreadComments(
            parseInt(this.route.snapshot.params['id'], 10)
          );
          this.commentForm.reset();
        },
        error: (error) => {
          console.error('Error creating comment', error);
        },
      });
  }
  // Vote functions
  fetchThreadVotes(id_thread: number): void {
    this.votesService.getAllThreadVotes(id_thread).subscribe({
      next: (votes) => {
        this.votes = votes;
      },
      error: (error) => {
        console.error('Error fetching votes', error);
      },
    });
  }

  fetchThreadVotesCount(id_thread: number): number {
    this.fetchThreadVotes(id_thread);
    return this.votes.length;
  }

  fetchCommentVotes(id_comment: number): void {
    this.votesService.getAllCommentVotes(id_comment).subscribe({
      next: (votes) => {
        const upvotes = votes.filter((vote) => vote.type === 1).length;
        const downvotes = votes.filter((vote) => vote.type === 0).length;
        const userVoteType = votes.find((vote) => vote.id_user === this.id)
          ?.type as VoteType;
        this.userCommentVotes[id_comment] = {
          upvotes,
          downvotes,
          userVoteType,
        };
      },
      error: (error) => {
        console.error('Error fetching votes', error);
      },
    });
  }

  fetchCommentVotesCount(id_comment: number): number {
    this.fetchCommentVotes(id_comment);
    return this.votes.length;
  }
  countUpvotes(): number {
    return this.votes.filter((vote) => vote.type === 1).length;
  }
  countDownvotes(): number {
    return this.votes.filter((vote) => vote.type === 0).length;
  }
  countUpvotesForComment(id_comment: number): number {
    return this.userCommentVotes[id_comment]?.upvotes || 0;
  }

  countDownvotesForComment(id_comment: number): number {
    return this.userCommentVotes[id_comment]?.downvotes || 0;
  }
  hasUserDownvoted(): boolean {
    return this.votes.some(
      (vote) => vote.id_user === this.id && vote.type === 0
    );
  }
  hasUserUpvoted(): boolean {
    return this.votes.some(
      (vote) => vote.id_user === this.id && vote.type === 1
    );
  }
  hasUserUpvotedComment(commentId: number): boolean {
    return this.userCommentVotes[commentId]?.upvotes === 1;
  }

  hasUserDownvotedComment(commentId: number): boolean {
    return this.userCommentVotes[commentId]?.downvotes === 0;
  }
  async createVote(
    voteType: 0 | 1,
    idThread: number | undefined = undefined,
    idComment: number | undefined = undefined
  ) {
    if (this.id === null) {
      console.error('User ID is null, cannot create vote');
      return;
    }
    if (idThread === undefined && idComment === undefined) {
      console.error(
        'Either idThread or idComment must be provided to create a vote'
      );
      return;
    }
    if (idThread !== undefined && idComment === undefined) {
      const existingVote = await firstValueFrom(
        this.votesService.getThreadVoteByUser(idThread, this.id)
      );
      if (existingVote) {
        const voteDto: UpdateVoteDto = {
          type: voteType,
          id_thread: idThread,
          id_comment: undefined,
        };
        this.votesService.getThreadVoteByUser(idThread, this.id).subscribe({
          next: (vote) => {
            const existingVote: VoteListItemDto = vote;
            this.votesService
              .updateVote(existingVote.id_vote, voteDto)
              .subscribe({
                next: () => {
                  this.fetchThreadVotesCount(idThread);
                },
                error: (error) => {
                  console.error('Error updating vote:', error);
                },
              });
          },
          error: (error) => {
            console.error('Error fetching existing vote:', error);
          },
        });
        return;
      }
      const voteDto: CreateVoteDto = {
        type: voteType,
        id_user: this.id,
        id_thread: idThread,
        id_comment: undefined,
      };

      this.votesService.createVote(voteDto).subscribe({
        next: (response) => {
          console.log('Thread vote created successfully:', response);
          this.fetchThreadVotesCount(idThread);
        },
        error: (error) => {
          console.error('Error creating thread vote:', error);
        },
      });
    } else if (idComment !== undefined && idThread === undefined) {
      const existingVote = await firstValueFrom(
        this.votesService.getCommentVoteByUser(idComment, this.id)
      );
      if (existingVote) {
        const voteDto: UpdateVoteDto = {
          type: voteType,
          id_thread: undefined,
          id_comment: idComment,
        };
        this.votesService.updateVote(existingVote.id_vote, voteDto).subscribe({
          next: () => {
            this.fetchCommentVotesCount(idComment);
          },
          error: (error) => {
            console.error('Error updating vote:', error);
          },
        });
        return;
      }
      const voteDto: CreateVoteDto = {
        type: voteType,
        id_user: this.id,
        id_thread: undefined,
        id_comment: idComment,
      };

      this.votesService.createVote(voteDto).subscribe({
        next: (response) => {
          console.log('Comment vote created successfully:', response);
          this.fetchCommentVotesCount(idComment);
        },
        error: (error) => {
          console.error('Error creating comment vote:', error);
        },
      });
    }
  }
  // Report functions
  createReport(id_user: number, id_comment: number) {
    this.reportsService
      .createReport({
        id_user: id_user,
        id_reporting_user: this.id ?? 0,
        id_comment: id_comment,
        reason: this.reportForm.value.reason || '',
        date: new Date().toISOString().split('T')[0],
      })
      .subscribe({
        next: () => {
          console.log('Report created successfully');
        },
        error: (error) => {
          console.error('Error creating report:', error);
        },
      });
  }
  async openReportModal(id_user: number, id_comment: number) {
    const ban = await firstValueFrom(this.bansService.getBanByUserId(id_user));

    if (ban && ban.id_user === id_user) {
      if (ban.id_user === id_user) {
        alert('User is already banned');
        return;
      }
    }
    this.ReportedUser = {
      id_user: id_user,
      id_comment: id_comment,
    } as ReportDto;
    this.isReportModalOpen = true;
    this.reportForm.reset();
  }
  closeReportModal(): void {
    this.isReportModalOpen = false;
  }
  submitReport(): void {
    if (this.ReportedUser) {
      this.createReport(
        this.ReportedUser.id_user,
        this.ReportedUser.id_comment
      );
      this.closeReportModal();
    }
  }
}
