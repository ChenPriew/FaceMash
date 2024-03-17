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
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementsComponent } from '../../components/dialog-elements/dialog-elements.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [MatCardModule, MatButtonModule, HeaderComponent, CommonModule],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class MainComponent implements OnInit {
  img1: any;
  img2: any;
  uid: any;
  isLoad = true;
  sendData: RandomImgRes[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid');

    document.body.className = 'main';
    this.loadRanImg();
  }

  openDialog() {
    this.sendData.push(this.img1);
    this.sendData.push(this.img2);
    const dialogRef = this.dialog.open(DialogElementsComponent, {
      data: this.sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async loadRanImg() {
    this.img1 = new Array();
    this.img2 = new Array();
    const temp = (await this.userService.getRanImg()) as RandomImgRes[];
    this.img1 = temp[0];
    this.img2 = temp[1];
    if (temp && temp.length >= 2) {
      this.isLoad = false;
    }
  }

  async vote(winImg: any, loseImg: any) {
    this.isLoad = true;
    let body = {};
    if (!localStorage.getItem('uid')) {
      body = {
        WinImageID: Number(winImg),
        LoseImageID: Number(loseImg),
      };
    } else {
      body = {
        VoterID: Number(this.uid),
        WinImageID: Number(winImg),
        LoseImageID: Number(loseImg),
      };
    }

    console.log(body);

    let temp = (await this.userService.vote(body)) as VoteRes;
    console.log(temp);

    if (temp.message == 'Vote successfully recorded') {
      Swal.fire('Success', 'Vote Success', 'success').then((result) => {
        if (result.isConfirmed) {
          this.loadRanImg();
        }
      });
    } else {
      let remainingTime = 5; // Set the initial remaining time in seconds

      const timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          Swal.close(); // Close the alert when the timer reaches 0
          this.loadRanImg(); // Load a random image
        } else {
          Swal.update({
            text: `Cooldown active. Cannot vote for the same ImageID within ${remainingTime} seconds.`,
          });
        }
      }, 1000); // Update the timer every second (1000 milliseconds)

      Swal.fire({
        title: 'Error',
        text: `Cooldown active. Cannot vote for the same ImageID within ${remainingTime} seconds.`,
        icon: 'error',
        showConfirmButton: false, // Hide the "OK" button
        timer: remainingTime * 1000, // Set the timer to the remaining time in milliseconds
        didOpen: () => {
          Swal.showLoading(); // Show a loading animation until the timer starts
        },
      }).then(() => {
        clearInterval(timerInterval); // Clear the interval when the alert is closed manually
      });
    }
  }
}
