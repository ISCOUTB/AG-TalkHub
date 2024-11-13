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
  BansService,
} from '../../api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
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
  isBanModalOpen = false;
  banReasonForm: FormGroup;

  constructor(
    private readonly reportsService: ReportsService,
    private readonly commentsService: CommentsService,
    private readonly threadsService: ThreadsService,
    private readonly authService: AuthService,
    private readonly banService: BansService,
    private readonly formBuilder: FormBuilder
  ) {
    this.banReasonForm = this.formBuilder.group({
      reason: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

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

  // Ban the user
  BanUser() {
    this.banService
      .createBan({
        id_user: this.selectedReport?.id_user ?? 0,
        reason: this.banReasonForm.value.reason ?? '',
        date: new Date().toISOString().split('T')[0],
      })
      .subscribe({
        next: (response) => {
          console.log('User banned', response);
          this.reportsService.deleteReport(this.selectedReport?.id_report ?? 0).subscribe({
            next: () => {
              console.log('Report deleted');
              this.loadReports();
              this.selectedReport = null;
            },
            error: (error) => {
              console.error('Error deleting report', error);
            },
          });
        },
        error: (error) => {
          console.error('Error banning user', error);
        },
      });
  }

  openBanModal() {
    this.isBanModalOpen = true;
  }

  closeBanModal() {
    this.isBanModalOpen = false;
  }

  dismissReport() {
    this.reportsService.deleteReport(this.selectedReport?.id_report ?? 0).subscribe({
      next: () => {
        console.log('Report deleted');
        this.loadReports();
        this.selectedReport = null;
      },
      error: (error) => {
        console.error('Error deleting report', error);
      },
    });
  }

  confirmBan() {
    this.BanUser();
    this.closeBanModal();
  }
}
