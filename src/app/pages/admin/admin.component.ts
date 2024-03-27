import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { UserRes } from '../../model/user_res';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatCard, MatButton, CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  users: UserRes[] = [];
  page = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    let temp = (await this.userService.getUsers()) as UserRes[];
    for (const item of temp) {
      this.users.push(item);
    }
  }
}
