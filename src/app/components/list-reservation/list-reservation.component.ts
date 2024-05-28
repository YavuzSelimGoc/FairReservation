import { Reservation } from './../../models/reservation';
import { DefaultFairService } from '../../services/default-fair.service';
import { ReservationService } from './../../services/reservation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit{
  filtertext="";
  reservation:Reservation[]
  constructor(private reservationService:ReservationService ,private defaultFairService:DefaultFairService){}

ngOnInit(): void {
  this.getFair()
}
getFair() {
  this.reservationService.getReservation().subscribe(repsonse => {
    this.reservation = repsonse.data  
  })
}
}
