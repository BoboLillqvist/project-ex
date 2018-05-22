import { Component, OnInit } from '@angular/core';
import { ExamWork } from '../../../models/exam-work.model';
import { Person } from '../../../models/person.model';
import { Company } from '../../../models/company.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "First contact";

  constructor() { }

  ngOnInit() {
  }

}
