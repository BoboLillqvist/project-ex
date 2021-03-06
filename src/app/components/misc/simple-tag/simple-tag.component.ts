import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { TagsService } from '../../../services/tags.service';

@Component({
  selector: 'app-simple-tag',
  templateUrl: './simple-tag.component.html',
  styleUrls: ['./simple-tag.component.scss'],
  providers: [TagsService]
})
export class SimpleTagComponent implements OnInit {

  @Output() onNewTag = new EventEmitter<boolean>();

  placeholderText: string = 'Ange kompetens som etikett';
  selectedTag: string;
  tagList: string;
  noResult = false;

  availableTags: any[] = [];

  skills: Array<String> = [];

  constructor(private tagsServ: TagsService) {
  }

  ngOnInit() {
    this.fillWithTagsFromDb();
  }

  //#region Tag functions

  fillWithTagsFromDb() {
    this.tagsServ.getAvailableTags().subscribe( (resData: any) => {
      this.availableTags = resData[0].values;
    });
  }

  tagAlreadyStored(tag: any): boolean {
    if (this.skills.includes(tag)) {
      return true;
    }
    return false;
  }

  removeEnteredTag(element: any): void {
    const tagToDelete = element.textContent;

    let index = 0;
    this.skills.forEach(enteredTag => {
        if (enteredTag === tagToDelete) {
          this.skills.splice(index, 1);
          this.restoreTag(enteredTag);
          this.onNewTag.emit(true);
        }
      index++;
    });
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

    // const inputElement = event.currentTarget; // Fungerar ej i chrome
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

      this.skills.push(this.selectedTag);

      this.onNewTag.emit(true);
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

  //#endregion

}
