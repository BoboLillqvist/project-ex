import { Component, OnInit, Input } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { Tags } from '../../../../../models/tags.model';
import { TagsService } from '../../../../../services/tags.service';
import { EditExamWorkComponent } from '../edit-exam-work.component';
import { ExamWork } from '../../../../../models/exam-work.model';

@Component({
  selector: 'app-edit-student-skills',
  templateUrl: './edit-student-skills.component.html',
  styleUrls: [
    './../edit-exam-work.component.scss',
    './edit-student-skills.component.scss'
  ],
  providers: [TagsService]
})
export class EditStudentSkillsComponent implements OnInit {
  constructor(private tagsService: TagsService) {
  }
  ngOnInit() {
  }
}
