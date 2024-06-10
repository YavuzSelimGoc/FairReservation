import { Reservation } from './../models/reservation';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reservation'
})
export class ReservationPipe implements PipeTransform {

  transform(value: Reservation[], filtertext: string): Reservation[] {
    filtertext = filtertext ? filtertext.toLocaleLowerCase() : "";
    return filtertext
      ? value.filter(
          (p: Reservation) =>
            p.phoneNumber.toLocaleLowerCase().includes(filtertext) ||
            p.name.toLocaleLowerCase().includes(filtertext) 
        )
      : value;
  }

}