import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: 'app-add-student-skills',
  templateUrl: './add-student-skills.component.html',
  styleUrls: [
    './../post-exam-work.component.scss',
    './add-student-skills.component.scss'
  ]
})
export class AddStudentSkillsComponent implements OnInit {

  selectedTag: string;
  tagList: string;
  noResult = false;

  storedTags = {
    essentials: [],
    complimentary: []
  };

  availableTags: any[] = [
    'C++',
    'C#',
    'C',
    'PHP',
    'Python',
    'Java',
    'Javascript'
  ];

  constructor() {
    // TODO: Läs in "skills"-array från databasen
  }

  ngOnInit() {
  }

  tagAlreadyStored(tag: any): boolean {
    for (const tagList in this.storedTags) {
      if (this.storedTags[tagList].includes(tag)) {
        return true;
      }
    }
    return false;
  }

  removeEnteredTag(element: any): void {
    const tagToDelete = element.textContent;

    for (const tagList of Object.keys(this.storedTags)) {
      let index = 0;
      this.storedTags[tagList].forEach(enteredTag => {
          if (enteredTag === tagToDelete) {
            this.storedTags[tagList].splice(index, 1);
            this.restoreTag(enteredTag);
          }
        index++;
      });
    }
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  onSelect(event: TypeaheadMatch, tagList: string, inputElement: any): void {
    this.selectedTag = event.value;
    this.tagList = tagList;

    this.storeTag();
    inputElement.value = null;
  }

  onEnter(event: any): void {
    if (!this.noResult) {
      return;
    }

    const inputElement = event.originalTarget;

    this.tagList = inputElement.id;
    this.selectedTag = inputElement.value;

    this.storeTag();
    inputElement.value = null;
  }

  removeStoredTag(tag: any): void {
      const index = this.availableTags.indexOf(tag);
      this.availableTags.splice(index, 1);
  }

  restoreTag(tag: any): void {
    this.availableTags.push(tag);
  }
}
