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
import { trigger, transition, style, animate } from '@angular/animations';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    MatFormField,
    MatLabel,
    MatHint,
    MatInputModule,
  ],
  animations: [
    trigger('slideInBottom', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  uid = localStorage.getItem('uid');
  user!: UserRes;
  userImg: UserImage[] = new Array(5);
  isLoad = true;
  isPutBio = false;

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
    this.userImg = new Array(5);
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
        },
        (error) => {
          console.error('Error uploading Image:', error);
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
        },
        (error) => {
          console.error('Error uploading avatar:', error);
        }
      );
    }
  }

  hoverStates: { [key: number]: boolean } = {};

  toggleHoverState(index: number): void {
    this.hoverStates[index] = !this.hoverStates[index];
  }

  changeImg(event: Event, ImageID: any): void {
    const fileInput = event.target as HTMLInputElement;
    const file: File = (fileInput.files as FileList)[0];
    if (file) {
      // Perform any necessary logic with the selected file
      console.log('Selected file:', file, 'ImageID:', ImageID);
    }
  }

  deleteImg(ImageID: any) {
    Swal.fire({
      title: 'Delete Confirmation',
      text: 'Are you sure you want to delete?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Handle deletion logic here
        console.log('Delete confirmed');
        const temp = await this.userService.deleteImg(ImageID);
        console.log(temp);
        if (temp.message == 'Image deleted successfully') {
          Swal.fire('Success', 'Delete Sucess', 'success').then((result) => {
            if (result.isConfirmed) {
              this.loadUser(this.uid);
              this.loadUserImg(this.uid);
            }
          });
        }
      } else {
        // Handle cancellation logic here
        console.log('Delete cancelled');
      }
    });
  }

  onDoneClick(input: HTMLInputElement) {
    console.log('Done Click', input.value);
  }
  onCloseClick() {
    this.isPutBio = false;
  }
}
