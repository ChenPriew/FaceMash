import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../componemt/header/header.component';
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TopReted } from '../../model/top_reted_res';

@Component({
  selector: 'app-top10',
  standalone: true,
  templateUrl: './top10.component.html',
  styleUrl: './top10.component.scss',
  imports: [HeaderComponent, MatCard, CommonModule],
})
export class Top10Component implements OnInit {
  top10: TopReted[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    document.body.className = 'top10';
    this.loadTopReted();
  }

  async loadTopReted() {
    const temp = (await this.userService.getTopRated()) as TopReted[];
    this.top10 = temp;
    console.log(this.top10);
  }
}
