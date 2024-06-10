import { Reservation } from '../../models/reservation';
import { DefaultFairService } from '../../services/default-fair.service';
import { ReservationService } from './../../services/reservation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit {
  filtertext = "";
  reservations: Reservation[];
  defaultFairId: number;

  constructor(
    private reservationService: ReservationService,
    private defaultFairService: DefaultFairService
  ) {}

  ngOnInit(): void {
    this.getDefaultFair();
  }

  getDefaultFair() {
    this.defaultFairService.getDefaultFair().subscribe(response => {
      this.defaultFairId = response.data[0].fairId;
      this.getFair(); // Call getFair after defaultFairId is set
    });
  }

  getFair() {
    this.reservationService.getReservation().subscribe(response => {
      this.reservations = response.data.filter(reservation => reservation.fairId === this.defaultFairId);
    });
  }
}
