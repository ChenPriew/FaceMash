import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { UserRes } from '../../model/user_res';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoolDownRes } from '../../model/cooldown_res';
import { FormsModule } from '@angular/forms';
import { VoteRes } from '../../model/vote_res';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatCard, MatButton, CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  users: UserRes[] = [];
  page = true;
  cooldown!: number;
  old_cooldown!: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadCoolDown();
  }

  async loadUsers() {
    let temp = (await this.userService.getUsers()) as UserRes[];
    for (const item of temp) {
      this.users.push(item);
    }
  }

  async loadCoolDown() {
    let temp = (await this.userService.getCoolDown()) as CoolDownRes[];

    if (temp) {
      this.cooldown = temp[0].cooldown;
      this.old_cooldown = temp[0].cooldown;
    }
  }

  async updateCooldown(cooldown: any) {
    const body = {
      cooldownTime: Number(cooldown),
    };

    let temp = (await this.userService.setCoolDown(body)) as VoteRes;
    if (temp.message == 'Cooldown data updated successfully') {
      Swal.fire('Success', 'Setting Success', 'success').then((result) => {
        if (result.isConfirmed) {
          this.loadCoolDown();
        }
      });
    }
  }
}
