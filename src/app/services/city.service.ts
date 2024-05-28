import { Injectable } from '@angular/core';
import { ResponseModel_Data } from '../models/responseModel_Data';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(City:City){
    let newPath=this.apiUrls+"City/add";
    return this.httpClient.post(newPath,City)
   }
   getCity():Observable<ListResponseModel<City>>{
    let newPath=this.apiUrls+"City/getall";
    return this.httpClient.get<ListResponseModel<City>>(newPath)
  }
  getCityByCountryId(id:number):Observable<ListResponseModel<City>>{
    let newPath=this.apiUrls+"City/getListByCountryId?countryId="+id;
    return this.httpClient.get<ListResponseModel<City>>(newPath)
  }
  getCityActive():Observable<ListResponseModel<City>>{
    let newPath=this.apiUrls+"City/getallActive";
    return this.httpClient.get<ListResponseModel<City>>(newPath)
  }
  getCityById(CityID):Observable <ResponseModel_Data<City>> {
    let newPath=this.apiUrls + "City/GetById/?id="+CityID
    return this.httpClient
       .get<ResponseModel_Data<City>>(newPath);
   }
  delete(City:City){
    let newPath=this.apiUrls + "City/delete"
    return this.httpClient.post(newPath,City)
   }
   passive(City:City){
    let newPath=this.apiUrls + "City/passive"
    return this.httpClient.post(newPath,City)
   }
   update(City:City){
    let newPath=this.apiUrls+"City/update";
    return this.httpClient.post(newPath,City)
   }
   active(City:City){
    let newPath=this.apiUrls + "City/active"
    return this.httpClient.post(newPath,City)
   }
}
