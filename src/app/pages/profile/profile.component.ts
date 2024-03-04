import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../componemt/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UserRes } from '../../model/user_res';
import { UserImage, UserImgRes } from '../../model/user_img_res';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    HeaderComponent,
    MatIcon,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
})
export class ProfileComponent implements OnInit {
  uid = localStorage.getItem('uid');
  user!: UserRes;
  userImg: UserImage[] = new Array(5);
  isLoad = true;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (!this.uid) {
      this.router.navigate(['/login']);
    }
    document.body.className = 'profile';
    this.loadUser(this.uid);
    this.loadUserImg(this.uid);
  }

  async loadUser(id: any) {
    const temp = (await this.userService.getUser(id)) as UserRes;
    this.user = temp;
  }

  async loadUserImg(id: any) {
    const temp = (await this.userService.getImgUser(id)) as UserImgRes;
    for (let i = 0; i < temp.userImages.length; i++) {
      this.userImg[i] = temp.userImages[i];
    }
    if (temp) {
      this.isLoad = false;
    }
  }

  uploadImg($event: Event) {
    const fileInput = $event.target as HTMLInputElement;
    const file: File = (fileInput.files as FileList)[0];

    if (file) {
      this.userService.uploadImg(file, this.uid).subscribe(
        (response) => {
          Swal.fire('Success', 'Upload Sucess', 'success').then((result) => {
            if (result.isConfirmed) {
              this.loadUser(this.uid);
              this.loadUserImg(this.uid);
            }
          });
          console.log('Avatar uploaded successfully');
          console.log(response);
        },
        (error) => {
          console.error('Error uploading avatar:', error);
        }
      );
    }
  }

  changeAvatar($event: Event) {
    const fileInput = $event.target as HTMLInputElement;
    const file: File = (fileInput.files as FileList)[0];
    if (file) {
      this.userService.uploadAvatar(file, this.uid).subscribe(
        (response) => {
          Swal.fire('Success', 'Upload Sucess', 'success').then((result) => {
            if (result.isConfirmed) {
              this.loadUser(this.uid);
              this.loadUserImg(this.uid);
            }
          });
          console.log('Avatar uploaded successfully');
          console.log(response);
        },
        (error) => {
          console.error('Error uploading avatar:', error);
        }
      );
    }
  }
}
