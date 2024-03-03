import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../componemt/header/header.component';
import { RandomImgRes } from '../../model/ran_img_res';
import { VoteRes } from '../../model/vote_res';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [MatCardModule, MatButtonModule, HeaderComponent, CommonModule],
})
export class MainComponent implements OnInit {
  img1: any;
  img2: any;
  uid: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid');
    console.log(this.uid);

    document.body.className = 'main';
    this.loadRanImg();
  }

  async loadRanImg() {
    const temp = (await this.userService.getRanImg()) as RandomImgRes[];
    this.img1 = temp[0];
    this.img2 = temp[1];

    console.log(this.img1, this.img2);
  }

  async vote(winImg: any, loseImg: any) {
    if (localStorage.getItem('uid')) {
      const body = {
        voterID: this.uid,
        winImageID: winImg,
        loseImageID: loseImg,
      };
      let temp = (await this.userService.vote(body)) as VoteRes;
      if (temp.message == 'Vote recorded successfully') {
        Swal.fire('Success', 'Vote Success', 'success').then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
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
