import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
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
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    document.body.className = 'register';
  }

  async register(
    userName: HTMLInputElement,
    password: HTMLInputElement,
    confirmPassword: HTMLInputElement,
    avatarURL: HTMLInputElement
  ) {
    if (password.value !== confirmPassword.value) {
      Swal.fire('Error', 'Passwords do not match', 'error');
    } else {
      const body = {
        username: userName.value,
        password: password.value,
        avatarURL: avatarURL.value,
      };
      let temp = (await this.userService.postRegister(body)) as LoginRes;
      if (temp.message == 'User created successfully') {
        Swal.fire('Success', 'Log-In Now', 'success');
        this.router.navigate(['/login']);
      }
    }
  }
}
