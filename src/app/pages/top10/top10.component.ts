import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../componemt/header/header.component';
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top10',
  standalone: true,
  templateUrl: './top10.component.html',
  styleUrl: './top10.component.scss',
  imports: [HeaderComponent, MatCard, CommonModule],
})
export class Top10Component implements OnInit {
  demo = [
    { i: 1 },
    { i: 2 },
    { i: 3 },
    { i: 4 },
    { i: 5 },
    { i: 6 },
    { i: 7 },
    { i: 8 },
    { i: 9 },
    { i: 10 },
  ];

  ngOnInit(): void {
    document.body.className = 'top10';
  }
}
