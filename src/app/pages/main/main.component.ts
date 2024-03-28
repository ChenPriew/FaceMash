import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../componemt/header/header.component';
import { RandomImgRes } from '../../model/ran_img_res';
import { VoteRes } from '../../model/vote_res';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatTooltip } from '@angular/material/tooltip';
import { CoolDownRes } from '../../model/cooldown_res';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    HeaderComponent,
    CommonModule,
    RouterModule,
    MatTooltip,
  ],
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
  cooldown!: number;

  Ea?: number;
  Eb?: number;
  Ra?: number;
  Rb?: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid');

    document.body.className = 'main';
    this.loadRanImg();
    this.loadCoolDown();
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
    let win;
    let lose;
    if (Number(winImg) == this.img1.ImageID) {
      win = this.img1;
      lose = this.img2;
    } else {
      win = this.img2;
      lose = this.img1;
    }

    console.log(win, lose);
    const k = 32;
    this.Ea = this.calculateEloProbability(win.EloScore, lose.EloScore);
    this.Eb = 1 - this.Ea;
    this.Ra = this.calculateEloRating(win.EloScore, k, 1, this.Ea);
    this.Rb = this.calculateEloRating(lose.EloScore, k, 0, this.Eb);

    let temp = (await this.userService.vote(body)) as VoteRes;

    if (temp.message == 'Vote successfully recorded') {
      const swalHtml = `
        <div style="overflow: hidden;" class="text-center w-100">
          <div class="row text-center">
            <div class="col">
              <div class="d-flex flex-column justify-content-center align-items-center">
                <span class="fw-semibold fs-4 text-success">WINNER</span>
                <img
                  style="
                    width: 200px;
                    height: 200px;
                    object-fit: cover;
                    object-position: center;
                  "
                  class="rounded-circle"
                  src="${win.ImageURL}"
                  alt=""
                />
              </div>
            </div>
            <div class="col">
              <div class="d-flex flex-column justify-content-center align-items-center">
                <span class="fw-semibold fs-4 text-danger">LOSER</span>
                <img
                  style="width: 200px; height: 200px;  object-fit: cover; object-position: center;"
                  class="rounded-circle"
                  src="${lose.ImageURL}"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="my-4">
            <span class="fw-semibold">Values of E for each figure</span>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <img style="width: 250px" src="../../../assets/img/Ea.png" alt="" />
            <img style="width: 250px" src="../../../assets/img/Eb.png" alt="" />
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center">
            <span>Ea = 1 / (1 + 10 ^ ((${lose.EloScore} - ${win.EloScore}) / 400)) = ${this.Ea}</span>
            <span>Eb = 1 / (1 + 10 ^ ((${win.EloScore} - ${lose.EloScore}) / 400)) = ${this.Eb}</span>
          </div>
          <div class="my-4">
            <span class="fw-semibold">Values of R for each figure</span>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <img style="width: 250px" src="../../../assets/img/R.png" alt="" />
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center">
            <span>Ra = 1011 + 32 * (1 - ${this.Ea}) = ${this.Ra}</span>
            <span>Rb = 935 + 32 * (0 - ${this.Eb}) = ${this.Rb}</span>
          </div>
        </div>
      `;
      Swal.fire({
        title: 'EloScore Calculate',
        html: swalHtml,
        showConfirmButton: true,
        width: '800px',
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadRanImg();
        }
      });
    } else {
      let remainingTime = this.cooldown; // Set the initial remaining time in seconds

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

  async loadCoolDown() {
    let temp = (await this.userService.getCoolDown()) as CoolDownRes[];

    if (temp) {
      this.cooldown = temp[0].cooldown;
    }
  }

  calculateEloProbability(win: number, lose: number): number {
    return 1 / (1 + Math.pow(10, (lose - win) / 400));
  }

  calculateEloRating(
    initialRating: number,
    kFactor: number,
    outcome: number,
    expected: number
  ): number {
    return Math.round(initialRating + kFactor * (outcome - expected));
  }
}
