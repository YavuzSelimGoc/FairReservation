import { Injectable } from '@angular/core';
import { ResponseModel_Data } from '../models/responseModel_Data';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Field } from '../models/field';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(Field:Field){
    let newPath=this.apiUrls+"Field/add";
    return this.httpClient.post(newPath,Field)
   }
   getField():Observable<ListResponseModel<Field>>{
    let newPath=this.apiUrls+"Field/getall";
    return this.httpClient.get<ListResponseModel<Field>>(newPath)
  }
  getFieldActive():Observable<ListResponseModel<Field>>{
    let newPath=this.apiUrls+"Field/getallActive";
    return this.httpClient.get<ListResponseModel<Field>>(newPath)
  }
  getFieldById(FieldID):Observable <ResponseModel_Data<Field>> {
    let newPath=this.apiUrls + "Field/GetById/?id="+FieldID
    return this.httpClient
       .get<ResponseModel_Data<Field>>(newPath);
   }
  delete(Field:Field){
    let newPath=this.apiUrls + "Field/delete"
    return this.httpClient.post(newPath,Field)
   }
   passive(Field:Field){
    let newPath=this.apiUrls + "Field/passive"
    return this.httpClient.post(newPath,Field)
   }
   update(Field:Field){
    let newPath=this.apiUrls+"Field/update";
    return this.httpClient.post(newPath,Field)
   }
   active(Field:Field){
    let newPath=this.apiUrls + "Field/active"
    return this.httpClient.post(newPath,Field)
   }
}
