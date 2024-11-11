import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../api';
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
  id: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuth();
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
  checkAuth() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.isLoggedIn = false;
      return;
    }

    const authTokenPayload: {sub: number, email: string, exp: number} = JSON.parse(atob(token.split('.')[1]));
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
    this.router.navigate(['/login']);
  }
  goToHome() {
    this.router.navigate(['/']);
  }
  goToNewThread() {
    this.router.navigate(['/newdiscussion']);
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
}
