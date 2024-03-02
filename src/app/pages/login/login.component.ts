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
    console.log(userName.value + ' ' + password.value);

    const body = {
      username: userName.value,
      password: password.value,
    };
    let temp = (await this.userService.postLogin(body)) as LoginRes;
    localStorage.setItem('uid', JSON.stringify(temp.userId));
    console.log(localStorage.getItem('uid'));
    if (temp.message == 'Login successful') {
      this.router.navigate(['/']);
    }
  }
}
