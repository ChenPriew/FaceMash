import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginRes } from '../../model/login_res';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  hide = true;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    document.body.className = 'register';
  }

  async register(
    disName: HTMLInputElement,
    userName: HTMLInputElement,
    password: HTMLInputElement,
    confirmPassword: HTMLInputElement
  ) {
    if (password.value !== confirmPassword.value) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    } else {
      const body = {
        display_name: disName.value,
        username: userName.value,
        password: password.value,
      };
      try {
        let temp = (await this.userService.postRegister(body)) as LoginRes;
        if (temp.message == 'User created successfully') {
          Swal.fire('Success', 'Log-in Now', 'success').then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        }
      } catch (error: any) {
        console.log(error); // ดูค่า error ที่ได้รับมาใน console
        if (
          error &&
          error.error &&
          error.error.error === 'Username already exists'
        ) {
          Swal.fire({
            title: 'Error',
            text: 'Username already exists',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'An error occurred',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    }
  }
}
