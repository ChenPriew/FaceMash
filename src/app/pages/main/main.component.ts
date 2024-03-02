import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../componemt/header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [MatCardModule, MatButtonModule, HeaderComponent],
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
    document.body.className = 'main';
  }
}
