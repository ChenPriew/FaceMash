import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
export class HeaderComponent {
  uid = localStorage.getItem('uid');

  constructor(private router: Router) {}

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
