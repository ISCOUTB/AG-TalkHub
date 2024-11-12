import { Component } from '@angular/core';
import {
  CommentDto,
  CommentsService,
  ReportDto,
  ReportListItemDto,
  ReportsService,
  ThreadDto,
  ThreadsService,
  UserDto,
  AuthService,
} from '../../api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  reports: ReportListItemDto[] = [];
  selectedReport: ReportDto | null = null;
  selectedReportComment: CommentDto | null = null;
  selectedReportThread: ThreadDto | null = null;
  selectedReportUser: UserDto | null = null;
  isLoading = false;

  constructor(
    private readonly reportsService: ReportsService,
    private readonly commentsService: CommentsService,
    private readonly threadsService: ThreadsService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.reportsService.getAllReports().subscribe({
      next: (reports) => {
        this.reports = reports;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching reports', error);
        this.isLoading = false;
      },
    });
  }

  onSelectReport(report: ReportListItemDto) {
    this.selectedReport = null;
    this.reportsService.getReportById(report.id_report).subscribe({
      next: (report) => {
        this.selectedReport = report;
        this.commentsService.getCommentById(report.id_comment).subscribe({
          next: (comment) => {
            if (this.selectedReport) {
              this.selectedReportComment = comment;
              this.threadsService.getThreadById(comment.id_thread).subscribe({
                next: (thread) => {
                  this.selectedReportThread = thread;
                },
                error: (error) => {
                  console.error('Error fetching thread', error);
                },
              });
            }
          },
          error: (error) => {
            console.error('Error fetching comment', error);
          },
        });
        this.authService.profileById(report.id_user).subscribe({
          next: (user) => {
            this.selectedReportUser = user;
          },
          error: (error) => {
            console.error('Error fetching user', error);
          },
        });
      },
      error: (error) => {
        console.error('Error fetching report', error);
      },
    });
  }
}
