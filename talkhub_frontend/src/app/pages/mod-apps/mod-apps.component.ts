import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthService,
  BansService,
  ModAplicationDto,
  ModAplicationListItemDto,
  ModaplicationsService,
  UpdateUserDto,
  UserDto,
} from '../../api';

@Component({
  selector: 'app-mod-apps',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mod-apps.component.html',
  styleUrls: ['./mod-apps.component.scss'],
})
export class ModAppsComponent {
  modApps: ModAplicationListItemDto[] = [];
  selectedModApp: ModAplicationDto | null = null;
  selectedModAppUser: UserDto | null = null;
  isAppModalOpen = false;
  user: UserDto | null = null;
  updatedUser: UpdateUserDto | null = null;

  constructor(
    private readonly modAppsService: ModaplicationsService,
    private readonly authService: AuthService,
    private readonly bansService: BansService
  ) {}

  ngOnInit(): void {
    this.loadModApps();
  }

  loadModApps() {
    this.modAppsService.getAllModaplications().subscribe({
      next: (response) => {
        this.modApps = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  onSelectedModApp(modApp: ModAplicationListItemDto) {
    this.selectedModApp = null;
    this.modAppsService
      .getModaplicationById(modApp.id_modaplication)
      .subscribe({
        next: (response) => {
          this.selectedModApp = response;
        },
        error: (error) => {
          console.error('Error fetching mod app', error);
        },
      });
    this.authService.profileById(modApp.user.id).subscribe({
      next: (user) => {
        this.selectedModAppUser = user;
      },
      error: (error) => {
        console.error('Error fetching user', error);
      },
    });
  }

  openAppModal() {
    this.isAppModalOpen = true;
  }

  closeAppModal() {
    this.isAppModalOpen = false;
  }

  ignoreApp() {
    this.modAppsService
      .deleteModaplication(this.selectedModApp?.id_modaplication ?? 0)
      .subscribe({
        next: () => {
          this.loadModApps();
          this.selectedModApp = null;
          this.selectedModAppUser = null;
          this.closeAppModal();
        },
        error: (error) => {
          console.error('Error ignoring app', error);
        },
      });
  }

  ApproveApp() {
    if (this.selectedModApp) {
      const userid = this.selectedModApp.id_user;
      this.bansService.getBanByUserId(userid).subscribe({
        next: (ban) => {
          if (ban) {
            if (ban.id_user === userid) {
              alert('User is already banned');
              this.ignoreApp();
            }
          }
        },
      });
      this.authService.profileById(userid).subscribe({
        next: (user) => {
          this.updatedUser = {
            name: user.name,
            email: user.email,
            role: 'moderator',
            bio: user.bio,
          };
          this.authService
            .updateProfileById(userid, this.updatedUser)
            .subscribe({
              next: () => {
                this.ignoreApp();
                this.selectedModApp = null;
                this.selectedModAppUser = null;
                this.loadModApps();
              },
              error: (error) => {
                console.error('Error updating user data', error);
              },
            });
        },
        error: (error) => {
          console.error('Error fetching user data', error);
        },
      });
    }
  }
}
