import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  ngOnInit(): void {
    document.body.className = 'profile';
  }

  changePassword(
    old_password: HTMLInputElement,
    new_password: HTMLInputElement
  ) {
    console.log(old_password.value + ' ' + new_password.value);
  }

  update(displayName: HTMLInputElement, userName: HTMLInputElement) {
    console.log(displayName.value + ' ' + userName.value);
  }
}
