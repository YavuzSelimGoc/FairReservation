import { Injectable } from '@angular/core';
import { ResponseModel_Data } from '../models/responseModel_Data';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { DefaultFair } from '../models/defaultFair';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultFairService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(DefaultFair:DefaultFair){
    let newPath=this.apiUrls+"DefaultFair/add";
    return this.httpClient.post(newPath,DefaultFair)
   }
   getDefaultFair():Observable<ListResponseModel<DefaultFair>>{
    let newPath=this.apiUrls+"DefaultFair/getall";
    return this.httpClient.get<ListResponseModel<DefaultFair>>(newPath)
  }
  getDefaultFairActive():Observable<ListResponseModel<DefaultFair>>{
    let newPath=this.apiUrls+"DefaultFair/getallActive";
    return this.httpClient.get<ListResponseModel<DefaultFair>>(newPath)
  }
  getDefaultFairById(DefaultFairID):Observable <ResponseModel_Data<DefaultFair>> {
    let newPath=this.apiUrls + "DefaultFair/GetById/?id="+DefaultFairID
    return this.httpClient
       .get<ResponseModel_Data<DefaultFair>>(newPath);
   }
  delete(DefaultFair:DefaultFair){
    let newPath=this.apiUrls + "DefaultFair/delete"
    return this.httpClient.post(newPath,DefaultFair)
   }
   passive(DefaultFair:DefaultFair){
    let newPath=this.apiUrls + "DefaultFair/passive"
    return this.httpClient.post(newPath,DefaultFair)
   }
   update(DefaultFair:DefaultFair){
    let newPath=this.apiUrls+"DefaultFair/update";
    return this.httpClient.post(newPath,DefaultFair)
   }
   active(DefaultFair:DefaultFair){
    let newPath=this.apiUrls + "DefaultFair/active"
    return this.httpClient.post(newPath,DefaultFair)
   }
}
