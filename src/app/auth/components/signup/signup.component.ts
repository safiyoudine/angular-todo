import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  notificationMessage: string | null = null;
  notificationClass: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  togglePassword() {
    this.hidePassword = !this.hidePassword
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (respose) => {
          this.showNotification("User Register Successfully", 'success');
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        },
        error: (error) => {
          this.showNotification("User Register Failed,Please Try Again", 'error');
          setTimeout(() => {
            this.signupForm.reset();
            this.router.navigate(['signup']);
          }, 2000);
        }
      });
    }
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationClass = `notification ${type}`;
    setTimeout(() => {
      this.notificationMessage = null;
      this.notificationClass = '';
    }, 2000); // Hide notification after 3 seconds
  }

}
