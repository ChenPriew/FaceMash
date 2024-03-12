import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../componemt/header/header.component';
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TopReted } from '../../model/top_reted_res';
import { MatIcon } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-top10',
  standalone: true,
  templateUrl: './top10.component.html',
  styleUrl: './top10.component.scss',
  imports: [
    HeaderComponent,
    MatCard,
    CommonModule,
    MatIcon,
    MatButtonModule,
    RouterModule,
    MatTooltipModule,
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
export class Top10Component implements OnInit {
  top10: TopReted[] = [];
  isLoad = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    document.body.className = 'top10';
    this.loadTopReted();
  }

  async loadTopReted() {
    const temp = (await this.userService.getTopRated()) as TopReted[];
    if (temp) {
      this.top10 = temp;
      // console.log(this.top10);

      temp.forEach((item, i) => {
        if (item.rank == null) {
          let temp = {
            type: 3,
            change: 'NEW',
          };
          this.top10[i].rank_change = temp;
        } else if (item.rank == i + 1) {
          let temp = {
            type: 2,
            change: 0,
          };
          this.top10[i].rank_change = temp;
        } else if (item.rank > i + 1) {
          let temp = {
            type: 1,
            change: item.rank - (i + 1),
          };
          this.top10[i].rank_change = temp;
        } else if (item.rank < i + 1) {
          let temp = {
            type: 0,
            change: i + 1 - item.rank,
          };
          this.top10[i].rank_change = temp;
        }
      });
      this.isLoad = false;
      console.log(this.top10);
    }
  }
}
