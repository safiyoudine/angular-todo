import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //this way we can add injection of service in angular 17
  // authService = inject(AuthService);

  notificationMessage: string | null = null;
  notificationClass: string = '';


  loginForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          const user = {
            id: response.userId,
            userRole: response.userRole,

          }
          StorageService.saveUser(user);
          StorageService.saveToken(response.jwt);
          this.showNotification("Login Successfully", 'success');
          setTimeout(() => {
            this.router.navigate(['admin/dashboard']);
          }, 1000); // Show notification for 1 seconds before redirecting
        },
        error: (error) => {
          this.showNotification("Login Failed", 'error');
          setTimeout(() => {
            this.loginForm.reset();
            this.router.navigate(['login']);
          }, 1000); // Show notification for 1 seconds before redirecting
        }
      });
    }
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationClass = `notification ${type}`;
    setTimeout(() => {
      this.notificationMessage = null;
      this.notificationClass = '';
    }, 1000); // Hide notification after 1 seconds
  }

}
