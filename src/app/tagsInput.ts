/*
  Litet script som fixar en tags-input. Fortfarande lite rå men orkar inte mer idag.
   För att använda:
    i html:
      <div class="tags-input" data-name="tags-input" id="tags"></div>

    i component:
      import { Tags } from '../tagsInput';
      export class... {
        tags: Tags;

        ngOnInit() {
          tags = new Tags(document);
        }

        collect(){
          this.skills = this.tags.getData(); // för att få hem tagsen som en array
        }
      }

    Feel free att designa om den, finns i en egen scss fil tagsInput
*/

export class Tags {


    constructor(private doc: Document) {
        [].forEach.call(doc.getElementsByClassName('tags-input'), function(element) {
            const hiddenInput = doc.createElement('input'),
                mainInput = doc.createElement('input'),
                tags = [];
                hiddenInput.setAttribute('type', 'hidden');
                hiddenInput.setAttribute('id', 'data');
                hiddenInput.setAttribute('name', element.getAttribute('data-name'));
        
                mainInput.setAttribute('type', 'text');
                mainInput.setAttribute('placeholder', 'Separera med ,');
                mainInput.classList.add('main-input');
                mainInput.addEventListener('input', () => {
                  const enteredTags = mainInput.value.split(',');
                  if(enteredTags.length > 1) {
                    // comma divider found
                    enteredTags.forEach( (t) => {
                      const filteredTag = filterTag(t);
                      if(filteredTag.length > 0) {
                        addTag(filteredTag);
                      }
                    });
                    mainInput.value = '';
                  }
                });
        
                element.appendChild(mainInput);
                element.appendChild(hiddenInput);
        
                function addTag(text) {
                  const tag = {
                    text: text,
                    element: document.createElement('span'),
                  };
        
                  tag.element.classList.add('tag');
                  tag.element.textContent = tag.text;
        
                  const closeBtn = document.createElement('span');
                  closeBtn.classList.add('close');
                  closeBtn.addEventListener('click', () => {
                    removeTag(tags.indexOf(tag));
                  });
                  tag.element.appendChild(closeBtn);
        
                  tags.push(tag);
        
                  element.insertBefore(tag.element, mainInput);
        
                  refreshTags();
                }
        
                function removeTag(index) {
                  const tag = tags[index];
                  tags.splice(index, 1);
                  element.removeChild(tag.element);
                  refreshTags();
                }
        
                function refreshTags() {
                  const tagsList = [];
                  tags.forEach( (t) => {
                    tagsList.push(t.text);
                  });
                  hiddenInput.value = tagsList.join(',');
                }
        
                function filterTag(tag) {
                  return tag.replace(/ /g, '-');
                }
          });
    }

    getData() {
      return this.doc.getElementById('data').getAttribute('value').split(',');
    }
}
