import { FairService } from './../../services/fair.service';
import { ReservationService } from './../../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
declare var window:any;


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit{
  selectParticipationType: string = "Katılım Türü*";
  selectSector: string = "Sektör*";
  selectCountry: string = "Ülke*";
  selectCity: string = "Şehir*";
  constructor(private formBuilder:FormBuilder,private router:Router,private reservationService:ReservationService){ this.createReservationAddForm()}
  formModel:any;
  reservationAddForm:FormGroup;
  ngOnInit(): void {
    this.formModel= new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }
  createReservationAddForm(){
    this.reservationAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      mail: ["", [Validators.required, Validators.email]],
      participationType: ["" , Validators.required],
      sector: ["" , Validators.required],
      company: ["" , Validators.required],
      task: ["" , Validators.required],
      country: ["" , Validators.required],
      city: ["" , Validators.required]
  });
  }
  add() {
    if (this.reservationAddForm.valid) {
      let reservationModel = Object.assign({}, this.reservationAddForm.value);
      this.reservationService.add(reservationModel).subscribe(response => {
        Swal.fire({
          title: 'Başarılı!',
          text: 'Rezervasyon başarıyla eklendi.',
          icon: 'success',
          confirmButtonText: 'Tamam'
        });
      }, error => {
        Swal.fire({
          title: 'Hata!',
          text: 'Rezervasyon eklenirken bir hata oluştu.',
          icon: 'error',
          confirmButtonText: 'Tamam'
        });
      });
    } else {
      console.log("Rezervasyon Eklenemedi");
    }
  }
  openModel(){
    this.formModel.show();
  }
  closeModel(){
    this.formModel.hide();
  }
}
