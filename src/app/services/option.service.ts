import { Injectable } from '@angular/core';
import { ResponseModel_Data } from '../models/responseModel_Data';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Option } from '../models/option';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(Option:Option){
    let newPath=this.apiUrls+"Option/add";
    return this.httpClient.post(newPath,Option)
   }
   getOption():Observable<ListResponseModel<Option>>{
    let newPath=this.apiUrls+"Option/getall";
    return this.httpClient.get<ListResponseModel<Option>>(newPath)
  }
  getOptionByFieldId(id:number):Observable<ListResponseModel<Option>>{
    let newPath=this.apiUrls+"Option/getListByFieldId?fieldId="+id;
    return this.httpClient.get<ListResponseModel<Option>>(newPath)
  }
  getOptionActive():Observable<ListResponseModel<Option>>{
    let newPath=this.apiUrls+"Option/getallActive";
    return this.httpClient.get<ListResponseModel<Option>>(newPath)
  }
  getOptionById(OptionID):Observable <ResponseModel_Data<Option>> {
    let newPath=this.apiUrls + "Option/GetById/?id="+OptionID 
    return this.httpClient
       .get<ResponseModel_Data<Option>>(newPath);
   }
  delete(Option:Option){
    let newPath=this.apiUrls + "Option/delete"
    return this.httpClient.post(newPath,Option)
   }
   passive(Option:Option){
    let newPath=this.apiUrls + "Option/passive"
    return this.httpClient.post(newPath,Option)
   }
   update(Option:Option){
    let newPath=this.apiUrls+"Option/update";
    return this.httpClient.post(newPath,Option)
   }
   active(Option:Option){
    let newPath=this.apiUrls + "Option/active"
    return this.httpClient.post(newPath,Option)
   }
}
