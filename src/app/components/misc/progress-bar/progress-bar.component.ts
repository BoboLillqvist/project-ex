import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  max: number;
  progress: number;
  showWarning: boolean;
  type: string;

  constructor() { }

  ngOnInit() {
  }

}
