import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../../models/student.model';

@Pipe({
    name: 'filter',
    pure: false,
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], filter: Array<String>): any {
        if (filter === undefined)
            return items;
            
        let sortedArray = [];
        
        console.log("pipe skills:", filter);

        console.log("students:",items);

        items.forEach(item => {
            let countMatching = 0;
            filter.forEach(skill => {

                item.skills.forEach(essSkill => {
                    if(skill === essSkill)
                        countMatching++;
                });
            });
            if(filter.length === countMatching){
                sortedArray.push(item);
            }

        })

        console.log("sortedArray: ",sortedArray);

        return sortedArray;

        }
    }
