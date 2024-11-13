import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService, UserDto } from '../../api';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent {
  isCollapsed = false;
  isLoggedIn = false;
  isRegular = true;
  id: number | null = null;
  user: UserDto | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuth();
    this.fetchUserRole();
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  fetchUserRole() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return;
    }
    const authTokenPayload: { sub: number; email: string; exp: number } =
      JSON.parse(atob(token.split('.')[1]));
    this.id = authTokenPayload.sub;
    this.authService.profileById(this.id).subscribe({
      next: (user) => {
        this.user = user;
        if (user.role === 'regular') {
          this.isRegular = true;
        } else {
          this.isRegular = false;
        }
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      },
    });
  }
  checkAuth() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.isLoggedIn = false;
      return;
    }

    const authTokenPayload: { sub: number; email: string; exp: number } =
      JSON.parse(atob(token.split('.')[1]));
    const expiryTimestampSeconds = authTokenPayload.exp;
    this.id = authTokenPayload.sub;
    const expiryTimestampMilliSeconds = expiryTimestampSeconds * 1000;

    this.isLoggedIn = expiryTimestampMilliSeconds > Date.now();
  }

  goToProfile() {
    if (this.id) {
      this.router.navigate([`/profile/${this.id}`]);
    }
  }
  goToLogin() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
    window.location.reload();
    });;
  }
  goToHome() {
    this.router.navigate(['/']);
  }
  goToNewThread() {
    this.router.navigate(['/newdiscussion']);
  }
  goToNewCategory() {
    this.router.navigate(['/newcategory']);
  }
  goToFaq() {
    this.router.navigate(['/faq']);
  }
  goToRules() {
    this.router.navigate(['/rules']);
  }
  goToAbout() {
    this.router.navigate(['/about']);
  }
  goToPopular() {
    this.router.navigate(['/popular']);
  }
  goToReports() {
    this.router.navigate(['/reports']);
  }
  goToModApps() {
    this.router.navigate(['/mod-apps']);
  }
  goToApply() {
    this.router.navigate(['/apply']);
  }
}
