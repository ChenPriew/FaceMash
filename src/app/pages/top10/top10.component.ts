import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../componemt/header/header.component';
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TopReted } from '../../model/top_reted_res';
import { MatIcon } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-top10',
  standalone: true,
  templateUrl: './top10.component.html',
  styleUrl: './top10.component.scss',
  imports: [HeaderComponent, MatCard, CommonModule, MatIcon],
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
    this.top10 = temp;
    if (temp) {
      this.isLoad = false;
    }
  }
}
