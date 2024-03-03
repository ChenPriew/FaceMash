import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../componemt/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UserRes } from '../../model/user_res';
import { UserImage, UserImgRes } from '../../model/user_img_res';
import { CommonModule } from '@angular/common';

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
    console.log(this.userImg);
  }

  uploadImg() {
    console.log(true);
  }
}
