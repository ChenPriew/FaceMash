import { UserService } from './../../services/api/user.service';
import { routes } from './../../app.routes';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UserRes } from '../../model/user_res';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  uid = localStorage.getItem('uid');
  userData: UserRes | undefined;
  isLoad = true;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (localStorage.getItem('uid')) {
      this.loadUserData(this.uid);
    }
  }

  async loadUserData(id: any) {
    const temp = (await this.userService.getUser(id)) as UserRes;
    this.userData = temp;
    console.log(this.userData);
    if (this.userData) {
      this.isLoad = false;
    }
  }

  logout() {
    Swal.fire({
      title: 'Log-out Confirmation',
      text: 'Are you sure you want to log-out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Log-out',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Handle deletion logic here
        localStorage.removeItem('uid');
        location.reload();
      } else {
        // Handle cancellation logic here
        console.log('Log-Out cancelled');
      }
    });
  }

  proFile() {
    if (localStorage.getItem('uid')) {
      this.router.navigate(['/profile']);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'You must log in',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
