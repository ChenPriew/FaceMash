import { ActivatedRoute } from '@angular/router';
import { ImgStatRes } from '../../model/img_stat_res';
import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
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
    this.id = this.activeatedRoute.snapshot.paramMap.get('id') || '';
    this.loadData(this.id);
  }

  async loadData(id: any) {
    this.imgStat = (await this.userService.getImgStat(id)) as ImgStatRes[];
    console.log(this.imgStat);
  }
}
