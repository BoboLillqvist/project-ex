import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { Tags } from '../../../../models/tags.model';
import { TagsService } from '../../../../services/tags.service';

@Component({
  selector: 'app-add-student-skills',
  templateUrl: './add-student-skills.component.html',
  styleUrls: [
    './../post-exam-work.component.scss',
    './add-student-skills.component.scss'
  ],
  providers: [TagsService]
})
export class AddStudentSkillsComponent implements OnInit {
  selectedTag: string;
  tagList: string;
  noResult = false;

  storedTags = {
    essentials: [],
    complimentary: []
  };

  availableTags: Array<String>;

  constructor(private tagsService: TagsService) {}

  ngOnInit() {
    if (!this.fetchTagsFromDatabase(this.tagsService)) {
      console.log('Could not get tags from database');
    }
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
    for (let i = 0; i < this.availableTags.length; i++) {
      if (this.availableTags[i] === this.selectedTag) {
        this.availableTags.splice(i, 1);
        return;
      }
    }
    console.log('Could not find tag to remove');
  }

  removeStoredTag(tag: any): void {
    const index = this.availableTags.indexOf(tag);
    this.availableTags.splice(index, 1);
  }

  restoreTag(tag: any): void {
    this.availableTags.push(tag);
  }

  fetchTagsFromDatabase(tagsService: TagsService): Boolean {
    this.tagsService.getAvailableTags()
      .subscribe((resTags) => {
        this.availableTags = resTags[0].values;

        if (this.availableTags === undefined || this.availableTags.length === 0) {
          return false;
        }
      });

    return true;
  }
}
