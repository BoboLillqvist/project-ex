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
  @ViewChild (EditStudentSkillsComponent) studentSkillsComponent: EditStudentSkillsComponent;

  examWork: ExamWork;
  examWorkId: String;

  initialApplyDueDate: Date;
  minDate: Date;
  maxDate: Date;

  backupExamWork: ExamWork;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examWorkService: ExamworkService,
    private router: Router,
    private tagsSerives: TagsService,
    private personService: PersonService
  ) {
    this.examWorkId = this.activatedRoute.snapshot.params['id'];
    this.examWork = new ExamWork('', '', '', [], [], '', '',
                                 new Person('', '', '', ''), '',
                                 new Company('', '', '', [])
    );


    this.setDates();
  }

  ngOnInit() {
    this.examWorkService.getExamWork(this.examWorkId)
      .subscribe(fetchedExamWork => {
        // Get exam-work
        this.examWork = fetchedExamWork;

        // Get tags
        this.studentSkillsComponent
              .storedTags.essentials = fetchedExamWork.essentialSkills;
        this.studentSkillsComponent
              .storedTags.complimentary = fetchedExamWork.complementarySkills;

        // Format date for HTML input element
        this.initialApplyDueDate = new Date(
          moment(this.examWork.applyDueDate).format('YYYY-MM-DD')
        );

        this.backupFetchedExamWork(this.examWork);
      });
  }

  updateExamWork() {
    // Update tags
    this.tagsSerives.updateAvailableTags(
      this.studentSkillsComponent.tags,
      this.studentSkillsComponent.storedTags
    ).subscribe(resData => this.studentSkillsComponent.tags = resData);

    // Update person
    this.personService.updatePerson(this.examWork.contact)
      .subscribe(resData => this.examWork.contact = resData);

    // Update examwork
    this.examWorkService.updateExamWork(this.examWork)
      .subscribe(resData => {
        this.examWork = resData;
        this.router.navigate(['/company/exam-work-dashboard/', this.examWorkId]);
    });
  }
  }

}
