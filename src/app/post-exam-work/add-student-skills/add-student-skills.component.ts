import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-student-skills',
  templateUrl: './add-student-skills.component.html',
  styleUrls: [
    './../post-exam-work.component.scss',
    './add-student-skills.component.scss'
  ]
})
export class AddStudentSkillsComponent implements OnInit {

  enteredTags = {
    essentials: [],
    complimentary: []
  };

  essentialInputElement: any;
  complimentaryInputElement: any;

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

  // TODO: Gör generell metod, läs nedan:
  // onSelectEssential() och onSelectComplimentary() bör så klart
  // vara EN generell metod, men jag vet inte hur man kollar
  // vilken input element som skickar, eller hur man tar reda på det ¯\_(ツ)_/¯
  onSelectEssential(event: any): void {
    const enteredTag = event.value;
    if (!this.tagAlreadyEntered(enteredTag)) {
      this.enteredTags.essentials.push(enteredTag);
      this.removeStoredTag(enteredTag);
    }
    this.essentialInputElement = null;
  }

  onSelectComplimentary(event: any): void {
    const enteredTag = event.value;
    if (!this.tagAlreadyEntered(enteredTag)) {
      this.enteredTags.complimentary.push(enteredTag);
      this.removeStoredTag(enteredTag);
    }
    this.complimentaryInputElement = null;
  }

  tagAlreadyEntered(tag: any): boolean {
    for (const tagList in this.enteredTags) {
      if (this.enteredTags[tagList].includes(tag)) {
        return true;
      }
    }
    return false;
  }

  removeEnteredTag(element: any): void {
    const tagToDelete = element.textContent;

    for (const tagList of Object.keys(this.enteredTags)) {
      let index = 0;
      this.enteredTags[tagList].forEach(enteredTag => {
          if (enteredTag === tagToDelete) {
            this.enteredTags[tagList].splice(index, 1);
            this.restoreTag(enteredTag);
          }
        index++;
      });
    }
  }

  removeStoredTag(tag: any): void {
      const index = this.availableTags.indexOf(tag);
      this.availableTags.splice(index, 1);
  }

  restoreTag(tag: any): void {
    this.availableTags.push(tag);
  }
}
