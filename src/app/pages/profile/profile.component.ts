import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../componemt/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [HeaderComponent, MatIcon, MatButtonModule, RouterModule],
})
export class ProfileComponent implements OnInit {
  uid = localStorage.getItem('uid');

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.uid) {
      this.router.navigate(['/login']);
    }
    document.body.className = 'profile';
  }
}
