import { ActivatedRoute, RouterModule } from '@angular/router';
import { ImgStatRes } from '../../model/img_stat_res';
import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [MatButton, MatIcon, RouterModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements OnInit {
  imgStat: ImgStatRes[] = [];
  id = '';

  constructor(
    private activeatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    document.body.className = 'login';
    this.id = this.activeatedRoute.snapshot.paramMap.get('id') || '';
    this.loadData(this.id);
  }

  async loadData(id: any) {
    this.imgStat = (await this.userService.getImgStat(id)) as ImgStatRes[];
    console.log(this.imgStat);
    let labels = new Array();
    let data = new Array();
    for (const item of this.imgStat) {
      const date = new Date(item.date);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      labels.push(formattedDate);
      data.push(item.eloScore);
    }

    new Chart('myChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'History Rank 7Day',
            data: data,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 1000,
            max: 2000,
            ticks: {
              stepSize: 1, // Display integer values only
            },
          },
        },
      },
    });
  }
}
