import { Injectable } from '@angular/core';
import { ResponseModel_Data } from '../models/responseModel_Data';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(Reservation:Reservation){
    let newPath=this.apiUrls+"Reservation/add";
    return this.httpClient.post(newPath,Reservation)
   }
   getReservation():Observable<ListResponseModel<Reservation>>{
    let newPath=this.apiUrls+"Reservation/getall";
    return this.httpClient.get<ListResponseModel<Reservation>>(newPath)
  }
  getReservationActive():Observable<ListResponseModel<Reservation>>{
    let newPath=this.apiUrls+"Reservation/getallActive";
    return this.httpClient.get<ListResponseModel<Reservation>>(newPath)
  }
  getReservationById(ReservationID):Observable <ResponseModel_Data<Reservation>> {
    let newPath=this.apiUrls + "Reservation/GetById/?id="+ReservationID
    return this.httpClient
       .get<ResponseModel_Data<Reservation>>(newPath);
   }
  delete(Reservation:Reservation){
    let newPath=this.apiUrls + "Reservation/delete"
    return this.httpClient.post(newPath,Reservation)
   }
   passive(Reservation:Reservation){
    let newPath=this.apiUrls + "Reservation/passive"
    return this.httpClient.post(newPath,Reservation)
   }
   update(Reservation:Reservation){
    let newPath=this.apiUrls+"Reservation/update";
    return this.httpClient.post(newPath,Reservation)
   }
   active(Reservation:Reservation){
    let newPath=this.apiUrls + "Reservation/active"
    return this.httpClient.post(newPath,Reservation)
   }
}
