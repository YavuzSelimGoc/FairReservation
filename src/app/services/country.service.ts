import { Injectable } from '@angular/core';
import { ResponseModel_Data } from '../models/responseModel_Data';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(Country:Country){
    let newPath=this.apiUrls+"Country/add";
    return this.httpClient.post(newPath,Country)
   }
   getCountry():Observable<ListResponseModel<Country>>{
    let newPath=this.apiUrls+"Country/getall";
    return this.httpClient.get<ListResponseModel<Country>>(newPath)
  }
  getCountryActive():Observable<ListResponseModel<Country>>{
    let newPath=this.apiUrls+"Country/getallActive";
    return this.httpClient.get<ListResponseModel<Country>>(newPath)
  }
  getCountryById(CountryID):Observable <ResponseModel_Data<Country>> {
    let newPath=this.apiUrls + "Country/GetById/?id="+CountryID
    return this.httpClient
       .get<ResponseModel_Data<Country>>(newPath);
   }
  delete(Country:Country){
    let newPath=this.apiUrls + "Country/delete"
    return this.httpClient.post(newPath,Country)
   }
   passive(Country:Country){
    let newPath=this.apiUrls + "Country/passive"
    return this.httpClient.post(newPath,Country)
   }
   update(Country:Country){
    let newPath=this.apiUrls+"Country/update";
    return this.httpClient.post(newPath,Country)
   }
   active(Country:Country){
    let newPath=this.apiUrls + "Country/active"
    return this.httpClient.post(newPath,Country)
   }
}
