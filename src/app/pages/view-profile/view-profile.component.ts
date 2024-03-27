import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserRes } from '../../model/user_res';
import { UserImage, UserImgRes } from '../../model/user_img_res';
import { UserService } from '../../services/api/user.service';
import { CommonModule, Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIcon, MatTooltip, MatButton],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss',
})
export class ViewProfileComponent implements OnInit {
  id = '';
  user!: UserRes;
  userImg: UserImage[] = [];
  isLoad = true;

  constructor(
    private activeatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.activeatedRoute.snapshot.paramMap.get('id') || '';
    this.loadUser(this.id);
    this.loadUserImg(this.id);
  }

  async loadUser(id: any) {
    const temp = (await this.userService.getUser(id)) as UserRes;
    this.user = temp;
  }

  async loadUserImg(id: any) {
    this.userImg = new Array();
    const temp = (await this.userService.getImgUser(id)) as UserImgRes;
    for (let i = 0; i < temp.userImages.length; i++) {
      this.userImg[i] = temp.userImages[i];
    }
    if (temp) {
      this.isLoad = false;
    }
  }

  back() {
    this.location.back();
  }
}
