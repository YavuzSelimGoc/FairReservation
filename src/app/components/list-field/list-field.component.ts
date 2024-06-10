import { FairService } from './../../services/fair.service';
import { Fair } from './../../models/fair';
import { Field } from './../../models/field';
import { FieldService } from './../../services/field.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DefaultFairService } from '../../services/default-fair.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-field',
  templateUrl: './list-field.component.html',
  styleUrls: ['./list-field.component.scss']
})
export class ListFieldComponent implements OnInit{
  constructor(private toastrService:ToastrService,private router:Router,private fairService:FairService,private defaultFairService:DefaultFairService,private fieldService:FieldService){}
field:Field[]
fairName:string
  filtertext="";

  ngOnInit(): void {
    this.getDefaultFair()
  }
  getDefaultFair() {
    this.defaultFairService.getDefaultFair().subscribe(repsonse => {
      this.getField(repsonse.data[0].fairId)
      this.getFairById(repsonse.data[0].fairId)
    })
  }
  getField(id:number) {
    this.fieldService.getFieldByFairId(id).subscribe(repsonse => {
      this.field = repsonse.data  
    })
  }
  getFairById(id:number) {
    this.fairService.getFairById(id).subscribe(repsonse => {
      this.fairName = repsonse.data.fairName  
    })
  }
  passive(field:Field){
    this.fieldService.passive(field).subscribe(response=>{
    });
  }
  active(field:Field){
    this.fieldService.active(field).subscribe(response=>{
    });
  }
  deleteBox(field:Field)
  {
    Swal.fire({
      title:"Emin Misiniz",
      text:"Silmek İstediğinize Emin Misiniz  ?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:'Evet, Silinsin',
      cancelButtonText:'Hayır, Silinmesin'
    }).then((result=>{
      if(result.value){
        Swal.fire("Sil","Silme işlemi başarılı","success")
        this.delete(field);
 
      }
      else if (result.dismiss===Swal.DismissReason.cancel){
        Swal.fire("Sil!","Silme İşleminden Vazgeçildi","error")
      }
    }))
  }
  delete(field:Field){
    this.fieldService.delete(field).subscribe(response=>{
      setTimeout(window.location.href="/admin/list-field",3000);
    });
  }

}
