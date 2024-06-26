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
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoad = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    document.body.className = 'login';
  }

  async login(userName: HTMLInputElement, password: HTMLInputElement) {
    const body = {
      username: userName.value,
      password: password.value,
    };
    if (!userName.value || !password.value) {
      console.log(true);

      Swal.fire({
        title: 'Error',
        text: 'Please input Username and Password',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    } else {
      this.isLoad = true;
      let temp = (await this.userService.postLogin(body)) as LoginRes;

      if (temp.message == 'Login admin successful') {
        localStorage.setItem('uid', JSON.stringify(temp.userId));
        const swalHtml = `
          <div class="d-flex justify-content-center align-items-center gap-3">
            <div
              onclick="window.location.href='/'"
              style="cursor: pointer"
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <img style="width: 20rem" src="../../../assets/img/user.jpg" alt="" />
              <span class="fw-semibold">USER</span>
            </div>
            <div
              onclick="window.location.href='/admin'"
              style="cursor: pointer"
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <img style="width: 20rem" src="../../../assets/img/admin.jpg" alt="" />
              <span class="fw-semibold">ADMIN</span>
            </div>
          </div>
        `;

        Swal.fire({
          title: 'Choose login Option',
          html: swalHtml,
          showConfirmButton: false,
          width: '800px',
          customClass: {
            title: 'fs-2 fw-bold mb-4',
          },
        });
      } else if (temp.message == 'Login successful') {
        localStorage.setItem('uid', JSON.stringify(temp.userId));
        this.router.navigate(['/']);
      } else {
        this.isLoad = false;
        Swal.fire({
          title: 'Error',
          text: 'Invalid username or password',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    }
  }
}
