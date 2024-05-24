import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { PdfSetting } from '../models/pdfSetting';
import { ResponseModel_Data } from './../models/responseModel_Data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfSettingService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(pdfSetting:PdfSetting){
    let newPath=this.apiUrls+"PdfSetting/add";
    return this.httpClient.post(newPath,pdfSetting)
   }
   getPdfSetting():Observable<ListResponseModel<PdfSetting>>{
    let newPath=this.apiUrls+"PdfSetting/getall";
    return this.httpClient.get<ListResponseModel<PdfSetting>>(newPath)
  }
  getPdfSettingActive():Observable<ListResponseModel<PdfSetting>>{
    let newPath=this.apiUrls+"PdfSetting/getallActive";
    return this.httpClient.get<ListResponseModel<PdfSetting>>(newPath)
  }
  getPdfSettingById(pdfSettingID):Observable <ResponseModel_Data<PdfSetting>> {
    let newPath=this.apiUrls + "PdfSetting/GetById/?id="+pdfSettingID
    return this.httpClient
       .get<ResponseModel_Data<PdfSetting>>(newPath);
   }
  delete(pdfSetting:PdfSetting){
    let newPath=this.apiUrls + "PdfSetting/delete"
    return this.httpClient.post(newPath,pdfSetting)
   }
   passive(pdfSetting:PdfSetting){
    let newPath=this.apiUrls + "PdfSetting/passive"
    return this.httpClient.post(newPath,pdfSetting)
   }
   update(pdfSetting:PdfSetting){
    let newPath=this.apiUrls+"PdfSetting/update";
    return this.httpClient.post(newPath,pdfSetting)
   }
   active(pdfSetting:PdfSetting){
    let newPath=this.apiUrls + "PdfSetting/active"
    return this.httpClient.post(newPath,pdfSetting)
   }
}

