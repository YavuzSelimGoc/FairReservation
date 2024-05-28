import { Fair } from './../../models/fair';
import { FairService } from './../../services/fair.service';
import { DefaultFairService } from './../../services/default-fair.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fair:Fair
  defaultFairId:number
  constructor(private defaultFairService:DefaultFairService,private fairService:FairService){ }

ngOnInit(): void {
  this.getDefaultFairId()
}
getFairById(id:number){
  this.fairService.getFairById(id).subscribe((response) => {
  this.fair=response.data
  });
}
getDefaultFairId(): Promise<number> {
  return new Promise((resolve, reject) => {
    this.defaultFairService.getDefaultFair().subscribe((response) => {
      const defaultFairId = response.data[0].fairId;
      this.defaultFairId = defaultFairId;
      this.getFairById(defaultFairId)
      resolve(defaultFairId);
    }, (error) => {
      reject(error);
    });
  });
}
createImgPath = (serverPath: string) => { 
  return environment.imgUrl+`${serverPath}`; 
  
}
}
