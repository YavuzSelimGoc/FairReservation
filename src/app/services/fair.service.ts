import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel_Data } from '../models/responseModel_Data';
import { ListResponseModel } from '../models/listResponseModel';
import { Fair } from '../models/fair';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FairService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(fair:Fair){
    let newPath=this.apiUrls+"fair/add";
    return this.httpClient.post(newPath,fair)
   }
   getFair():Observable<ListResponseModel<Fair>>{
    let newPath=this.apiUrls+"fair/getall";
    return this.httpClient.get<ListResponseModel<Fair>>(newPath)
  }
  getFairActive():Observable<ListResponseModel<Fair>>{
    let newPath=this.apiUrls+"fair/getallActive";
    return this.httpClient.get<ListResponseModel<Fair>>(newPath)
  }
  getFairById(fairID):Observable <ResponseModel_Data<Fair>> {
    let newPath=this.apiUrls + "fair/GetById/?id="+fairID
    return this.httpClient
       .get<ResponseModel_Data<Fair>>(newPath);
   }
  delete(fair:Fair){
    let newPath=this.apiUrls + "fair/delete"
    return this.httpClient.post(newPath,fair)
   }
   passive(fair:Fair){
    let newPath=this.apiUrls + "fair/passive"
    return this.httpClient.post(newPath,fair)
   }
   update(fair:Fair){
    let newPath=this.apiUrls+"fair/update";
    return this.httpClient.post(newPath,fair)
   }
   active(fair:Fair){
    let newPath=this.apiUrls + "fair/active"
    return this.httpClient.post(newPath,fair)
   }
}
