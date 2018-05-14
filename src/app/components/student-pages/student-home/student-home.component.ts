import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamWork } from '../../../models/exam-work.model';
import { ExamworkService } from '../../../services/examwork.service';
import { SimpleTagComponent } from '../../profiles/create-student-profile/simple-tag/simple-tag.component';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
  providers: [ExamworkService]
})
export class StudentHomeComponent implements OnInit {

  @ViewChild(SimpleTagComponent) tagComp;

  examWorks: Array<ExamWork> = [];
  sortedWorks: Array<ExamWork> = [];
  noWorks: boolean = false;
  showMoreBtn: boolean = false;
  showLimit: number = 5;

  constructor(private examService: ExamworkService) { }

  ngOnInit() {
    this.tagComp.placeholderText = 'Filtrera med nyckelord';
    this.examService.getExamWorks().subscribe( resData => {
      this.examWorks = resData;
      this.sortedWorks = resData;

      if(this.sortedWorks.length > this.showLimit) {
        this.showMoreBtn = true;
      }
    });
  }

  showMoreWorks() {
    this.showLimit += 5;
    if (this.showLimit > this.sortedWorks.length) {
      this.showMoreBtn = false;
    }
  }

  sortExamWorks() {
    console.log(this.tagComp.skills);
    this.noWorks = false;
    this.sortedWorks = [];

    this.examWorks.forEach(examwork => {
      let countMatching = 0;

      this.tagComp.skills.forEach(skill => {

        // check versus essential skills
        examwork.essentialSkills.forEach(essSkill => {
          if(skill === essSkill) {
            countMatching++;
          }
        });
        
        // check versus complementary skill
        examwork.complementarySkills.forEach(compSkill => {
          if(skill === compSkill) {
            countMatching++;
          }
        });
      });

      if(this.tagComp.skills.length === countMatching) {
        this.sortedWorks.push(examwork);
      }

    });

    if (this.sortedWorks.length < 1) {
      this.noWorks = true;
    } else if(this.sortedWorks.length < this.showLimit) {
      this.showMoreBtn = false;
    } else {
      this.showMoreBtn = true;
    }
    
  }
}
