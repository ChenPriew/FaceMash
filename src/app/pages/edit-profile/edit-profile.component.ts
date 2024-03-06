import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import { VoteRes } from '../../model/vote_res';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  uid = localStorage.getItem('uid');
  isLoad = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    document.body.className = 'profile';
  }

  changePassword(
    old_password: HTMLInputElement,
    new_password: HTMLInputElement
  ) {
    console.log(old_password.value + ' ' + new_password.value);
  }

  async update(displayName: HTMLInputElement, userName: HTMLInputElement) {
    this.isLoad = true;
    let body = {};
    if (displayName.value) {
      body = {
        display_name: displayName.value,
      };
    } else if (userName.value) {
      body = {
        Username: userName.value,
      };
    }

    const temp = (await this.userService.putUser(this.uid, body)) as VoteRes;
    if (temp.message == 'User updated successfully') {
      Swal.fire('Success', 'Update Success', 'success').then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/profile');
        }
      });
    } else {
      this.isLoad = false;
      Swal.fire({
        title: 'Error',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  }
}
