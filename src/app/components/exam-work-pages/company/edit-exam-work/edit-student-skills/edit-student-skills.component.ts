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

  selectedTag: string;
  tagList: string;
  noResult = false;

  tags: Tags;
  examWork: any;

  storedTags = {
    essentials: [],
    complimentary: []
  };

  constructor(private tagsService: TagsService) {
    this.tags = new Tags();
  }

  ngOnInit() {
    this.tagsService.getAvailableTags()
      .subscribe((resTags) => {
        this.tags = resTags[0];

        // TODO: Få denna funktionen att göra vad den ska
        // this.removeAlreadyAddedTags();
      });
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

    // const inputElement = event.originalTarget; // fungerar ej i chrome
    const inputElement = event.target;

    this.tagList = inputElement.id;
    this.selectedTag = inputElement.value;

    this.storeTag();
    inputElement.value = null;
  }

  storeTag(): void {
    if (this.tagAlreadyStored(this.selectedTag)) {
      console.log('Tag"' + this.selectedTag + '" already stored');
      return;
    }
      this.removeTagFromAvailable();

      this.storedTags[this.tagList].push(this.selectedTag);
  }

  removeTagFromAvailable() {
    for (let i = 0; i < this.tags.values.length; i++) {
      if (this.tags.values[i] === this.selectedTag) {
        this.tags.values.splice(i, 1);
        return;
      }
    }
    console.log('Could not find tag to remove');
  }

  removeStoredTag(tag: any): void {
    const index = this.tags.values.indexOf(tag);
    this.tags.values.splice(index, 1);
  }

  restoreTag(tag: any): void {
    this.tags.values.push(tag);
  }

  removeAlreadyAddedTags() {
    // Det här är en svindålig funktion, T blir typ alltid
    // T = O(2n^2) för att exekvera, och då har jag inte
    // ens räknat med .splice() som säkert också är kvadratisk.
    // Men eftersom det inte blir jätte mycket data så får det vara så ¯\_(ツ)_/¯

    for (let i = 0; i < this.tags.values.length; i++) {

      for (let j = 0; j < this.storedTags['essentials'].length; j++) {
        if (this.tags.values[i] === String(this.storedTags.essentials[j])) {
          this.tags.values.splice(j, 1);
          return;
        }
      }

      for (let j = 0; j < this.storedTags['complimentary'].length; j++) {
        if (this.tags.values[i] === String(this.storedTags.complimentary[j])) {
          this.tags.values.splice(j, 1);
          return;
        }
      }

    }
    console.log('To inte bort nått');
  }
}
