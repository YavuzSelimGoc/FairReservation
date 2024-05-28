import { ToastrService } from 'ngx-toastr';
import { DefaultFairService } from './../../services/default-fair.service';
import { FairService } from './../../services/fair.service';
import { Fair } from './../../models/fair';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { PdfSettingService } from 'src/app/services/pdf-setting.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-fair',
  templateUrl: './list-fair.component.html',
  styleUrls: ['./list-fair.component.scss']
})
export class ListFairComponent implements OnInit{
  filtertext="";
  Fairs:Fair[]
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private fairService:FairService,private pdfService:PdfSettingService,private router:Router,private defaultFairService:DefaultFairService){}
  fairUpdateForm:FormGroup;

  ngOnInit(): void {
    this.createFairUpdateForm();
    this.getFair()
    
  }
  getFair() {
    this.fairService.getFair().subscribe(repsonse => {
      this.Fairs = repsonse.data  
    })
  }
  createFairUpdateForm(){
    this.fairUpdateForm=this.formBuilder.group({
      fairId :["",Validators.required],
      defaultFairId :[1,Validators.required],
    })
  }

  setDefaultFair(fair:Fair){
    Swal.fire({
      title:"Emin Misiniz",
      text:"Varsayılan Fuarı Değiştirmek İstediğinize Emin Misiniz  ?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:'Evet, Değiştirilsin',
      cancelButtonText:'Hayır, Değiştirilmesin'
    }).then((result=>{
      if(result.value){
        Swal.fire("Fuar Seçimi","Varsayılan Fuar"+fair.fairName+"Olarak Ayarlandı.","success")
        this.update(fair.fairId);
     }
      else if (result.dismiss===Swal.DismissReason.cancel){
        Swal.fire("Değiştirme!","Değiştirme İşleminden Vazgeçildi","error")
      }
    }))
  }
  update(id:number){
    this.fairUpdateForm.controls['fairId'].setValue(id);
    console.log(this.fairUpdateForm.value)
    if(this.fairUpdateForm.valid){
      let fairModel =Object.assign({},this.fairUpdateForm.value) 
      this.defaultFairService.update(fairModel).subscribe(response=>{
        this.router.navigate(["/"])
      });
    }
    else {
      this.toastrService.error("Form Gönderilirken Bir Hata Oluştu. Bilgileri Eksiksiz giriniz","Hata")
    } 
  }


  deleteBox(fair:Fair)
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
        this.delete(fair);
 
      }
      else if (result.dismiss===Swal.DismissReason.cancel){
        Swal.fire("Sil!","Silme İşleminden Vazgeçildi","error")
      }
    }))
  }
  pdfSettings(id:number){
    this.pdfService.getPdfSetting().subscribe(response => {
      let found = false;
      response.data.forEach(item => {
        if (item.fairId === id) {
          this.router.navigate(["/admin/update-pdfSettings/"+id])       
             found = true;
          return;
        }
      });
      if (!found) {
                  this.router.navigate(["/admin/add-pdf-settings"])       

      }
    });
  }
  
  delete(fair:Fair){
    this.fairService.delete(fair).subscribe(response=>{
      setTimeout(window.location.href="/admin/list-fair",3000);
    });
  }
  passive(fair:Fair){
    this.fairService.passive(fair).subscribe(response=>{
    });
  }
  active(fair:Fair){
    this.fairService.active(fair).subscribe(response=>{
    });
  }




  createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
    
  }

}
