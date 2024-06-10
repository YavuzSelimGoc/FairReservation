import { Fair } from './../../models/fair';
import { FairService } from './../../services/fair.service';
import { PdfSettingService } from './../../services/pdf-setting.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pdf-setting',
  templateUrl: './add-pdf-setting.component.html',
  styleUrls: ['./add-pdf-setting.component.scss']
})
export class AddPdfSettingComponent implements OnInit{
  pdfSettingAddForm:FormGroup;
  fairs:Fair[]
  selectFair: string = "Fuar Seçiniz*";
  selectAlligent: string = "Düzen Seçiniz*";
  selectLocation: string = "Konumlandırma Bilgisi Seçiniz*";

  constructor(private formBuilder:FormBuilder,private fairService:FairService,private toastrService:ToastrService,private pdfSettingService:PdfSettingService,private router:Router) {this.initForm() }
  ngOnInit(): void {
    this.getFair()
  }
  initForm(){
    this.pdfSettingAddForm=this.formBuilder.group({
      fairId:["",Validators.required],
      alignmentSelect:["",Validators.required],
      positionSelect:["",Validators.required],
      imageSize:["",Validators.required],
      qrSize:["",Validators.required],
    })
  }
  add(){
    if(this.pdfSettingAddForm.valid){
      let fairModel =Object.assign({},this.pdfSettingAddForm.value) 
      this.pdfSettingService.add(fairModel).subscribe(response=>{
        this.router.navigate(["/admin/list-fair"])
        this.toastrService.success("Pdf Ayarları Başarı ile Eklendi","Tebrikler")
      });
    }
    else {
      console.log(this.pdfSettingAddForm.value)
        this.toastrService.error("Pdf Ayarı Ekleme İşlermi Başarısız Bilgilerin Eksiksiz Olduğundan Emin Olun","Hata")
    }  
   
  }
  getFair() {
    this.fairService.getFair().subscribe(repsonse => {
      this.fairs = repsonse.data  
    })
  }

}
