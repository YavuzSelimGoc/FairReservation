import { Fair } from './../models/fair';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fair'
})
export class FairPipe implements PipeTransform {

  transform(value: Fair[], filtertext: string): Fair[] {
    filtertext = filtertext ? filtertext.toLocaleLowerCase() : "";
    return filtertext
      ? value.filter(
          (p: Fair) =>
            p.fairName.toLocaleLowerCase().includes(filtertext) 
        )
      : value;
  }
}
