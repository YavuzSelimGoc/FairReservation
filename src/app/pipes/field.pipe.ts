import { Field } from './../models/field';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'field'
})
export class FieldPipe implements PipeTransform {

  transform(value: Field[], filtertext: string): Field[] {
    filtertext = filtertext ? filtertext.toLocaleLowerCase() : "";
    return filtertext
      ? value.filter(
          (p: Field) =>
            p.fieldName.toLocaleLowerCase().includes(filtertext) ||
            p.fieldType.toLocaleLowerCase().includes(filtertext) 
        )
      : value;
  }

}