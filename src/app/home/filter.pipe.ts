import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, filter: any, filterItems: Array<any>, isAnd: boolean): any {
    console.log('Filtering ..');
    if (filter && Array.isArray(items) && filterItems) {
      let filterKeys = Object.keys(filter);
      let checkedItems = filterItems.filter(item => { return item.checked; });
      if (!checkedItems || checkedItems.length === 0) { return items; }
      if (isAnd) {
        return items.filter(item =>
            filterKeys.reduce((acc1, keyName) =>
                (acc1 && checkedItems.reduce((acc2, checkedItem) => acc2 && new RegExp(item[keyName], 'gi').test(checkedItem.value) || checkedItem.value === "", true))
              , true)
              );
      } else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return checkedItems.some((checkedItem) => {
              return new RegExp(item[keyName], 'gi').test(checkedItem.value) || checkedItem.value === "";
            });
          });
        });
      }
    } else {
      return items;
    }
  }
}
    transform(items: any[], filter: Array<String>): any {
        if (filter === undefined)
            return items;
        
        let sortedArray = [];


// @Pipe({
//     name: 'filter',
//     pure: false,
// })
// export class FilterPipe implements PipeTransform {
//     transform(items: any, filter: string): any {
//         if (filter === undefined)
//             return items;
        items.forEach(item => {
            filter.forEach(skill => {
                item.skills.forEach(essSkill => {
                    if(skill === essSkill)
                        sortedArray.push(item);
                });
            })

//         //items som matchar och returnerar true är kvar, de som är false filtreras ut

//             return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
//         }
//     }
        })

        return sortedArray;

// @Pipe({
//     name: 'filter2',
//     pure: false,
// })
// export class FilterDescriptionPipe implements PipeTransform {
//     transform(items: any[], filter: string): any {
//         if (!items || !filter) {
//             return items;
//         }

//         return items.filter(item => item.gender.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
//     }
// }
