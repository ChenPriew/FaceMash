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
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.body.className = 'login';
  }

  async login(userName: HTMLInputElement, password: HTMLInputElement) {
    const body = {
      username: userName.value,
      password: password.value,
    };
    let temp = (await this.userService.postLogin(body)) as LoginRes;
    localStorage.setItem('uid', JSON.stringify(temp.userId));
    if (temp.message == 'Login successful') {
      this.router.navigate(['/']);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Invalid username or password',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  }
}
