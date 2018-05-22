import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  // Source: https://stackoverflow.com/a/24039459
  transform(input: any): any {
    input = input || '';
    return input.replace(
      /\w\S*/g, function(txt) {
        return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      });
  }
}
