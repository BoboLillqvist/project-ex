import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamworkService } from '../../../../services/examwork.service';
import { ExamWork } from '../../../../models/exam-work.model';
import { Person } from '../../../../models/person.model';
import { Company } from '../../../../models/company.model';
import { Router } from '@angular/router';
import { EditStudentSkillsComponent } from './edit-student-skills/edit-student-skills.component';
import { TagsService } from '../../../../services/tags.service';
import { PersonService } from '../../../../services/person.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-exam-work',
  templateUrl: './edit-exam-work.component.html',
  styleUrls: ['./edit-exam-work.component.scss'],
  providers: [
    ExamworkService,
    TagsService,
    PersonService
  ]
})
export class EditExamWorkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
