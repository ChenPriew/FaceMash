import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-view-image',
  standalone: true,
  imports: [MatIcon, MatButton],
  templateUrl: './view-image.component.html',
  styleUrl: './view-image.component.scss',
})
export class ViewImageComponent {
  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
