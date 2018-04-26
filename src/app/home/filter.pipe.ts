import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false,
})
export class FilterTitlePipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }

        //items som matchar och returnerar true är kvar, de som är false filtreras ut
        return items.filter(item => item.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}

@Pipe({
    name: 'filter2',
    pure: false,
})
export class FilterDescriptionPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }

        return items.filter(item => item.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}
