import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, CategoriesService, UserDto } from '../../api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newcategory',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './newcategory.component.html',
  styleUrls: ['./newcategory.component.scss'],
})
export class NewcategoryComponent {
  newCategoryForm: FormGroup;
  user: UserDto | null = null;
  id: number | null = null;
  
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.newCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.maxLength(1250), Validators.minLength(10)]],
    })
  }
  ngOnInit(): void {
    this.fetchUserRole();
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
          alert('Unauthorized: Only moderators and above can create new categories!');
          this.router.navigate(['/'], { replaceUrl: true });
        }
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      },
    });
  }
  createCategory() {
    this.fetchUserRole();
    this.categoriesService.createCategory({
      name: this.newCategoryForm.value.name || '',
      description: this.newCategoryForm.value.description || '',
    })
    .subscribe({
      next: (response) => {
        this.router.navigate(['/categories', response.id_category])
      },
      error: (error) => {
        console.error('Error creating category', error)
      }
    })
  }

}
