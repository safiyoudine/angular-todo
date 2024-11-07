import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupResponse } from '../../../../auth/interfaces/signup-response';
import { AdminService } from '../../services/admin.service';
import { NavbarComponent } from "../../../../../shared/components/navbar/navbar.component";
import {CategoriesResponse} from "../../../../auth/interfaces/categories-response";

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.css'
})
export class PostCategoryComponent {
  postCategoryForm!: FormGroup;
  notificationMessage: string | null = null;
  notificationClass: string = '';

  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.postCategoryForm = this.fb.group({
      label: ['', [Validators.required,]]
    });
  }

  postCategory() {
    if (this.postCategoryForm.valid) {
      this.adminService.postCategory(this.postCategoryForm.value).subscribe({
        next: () => {
          this.showNotification("Category Created Successfully", 'success');
          setTimeout(() => {
            this.router.navigate(['admin/dashboard']);
          }, 1000);
        },
        error: (error) => {
          this.showNotification("Something Went Wrong, Please Try Again!...", 'error');
          setTimeout(() => {
            this.postCategoryForm.reset();
            this.router.navigate(['admin/category']);
          }, 1000); // Show notification for 2 seconds before redirecting
        }
      })
    }
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationClass = `notification ${type}`;
    setTimeout(() => {
      this.notificationMessage = null;
      this.notificationClass = '';
    }, 1000);
  }
}
