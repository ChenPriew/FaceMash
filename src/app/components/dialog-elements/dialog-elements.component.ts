import { RandomImgRes } from './../../model/ran_img_res';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-elements',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-elements.component.html',
  styleUrl: './dialog-elements.component.scss',
})
export class DialogElementsComponent {
  s1e1: number;
  s1e2: number;
  s1u1: number;
  s1u2: number;

  s2u1: number;
  s2u2: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: RandomImgRes[]) {
    this.s1e1 = this.e1(data[0].EloScore, data[1].EloScore);
    this.s1e2 = 1 - this.s1e1;
    this.s1u1 = this.win_updated(data[0].EloScore, this.s1e1);
    this.s1u2 = this.lose_updated(data[1].EloScore, this.s1e2);

    this.s2u1 = this.lose_updated(data[0].EloScore, this.s1e1);
    this.s2u2 = this.win_updated(data[1].EloScore, this.s1e2);
  }

  e1(win: number, lose: number) {
    return 1 / (1 + Math.pow(10, (lose - win) / 400));
  }

  win_updated(elo: number, e: number) {
    const k = 32;
    return Math.floor(elo + k * (1 - e));
  }

  lose_updated(elo: number, e: number) {
    const k = 32;
    return Math.floor(elo + k * (0 - e));
  }
}
