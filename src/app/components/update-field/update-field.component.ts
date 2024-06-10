import { Fair } from './../../models/fair';
import { Field } from './../../models/field';
import { FieldService } from './../../services/field.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from "sweetalert2"
import { FairService } from '../../services/fair.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-field',
  templateUrl: './update-field.component.html',
  styleUrls: ['./update-field.component.scss']
})
export class UpdateFieldComponent implements OnInit {
  field:Field
  fields:Field[]
  fair:Fair[]
  fieldId:number
  updateFieldForm:FormGroup
  constructor(private toastrService:ToastrService,private router:Router,private fairService:FairService,private activatedroute:ActivatedRoute,private formBuilder:FormBuilder,private fieldService:FieldService){this.initForm()}
  ngOnInit(): void {
    this.activatedroute.params.subscribe(params=>{
      if(params["fieldId"]){
        this.fieldId=params["fieldId"]
        this.getFair();
        this.getFieldById(params["fieldId"])
        this.getField()
      }
      else{
        this.getFair();
        this.getFieldById(params["fieldId"])
        this.getField()
      }
      })
  }
  getFair() {
    this.fairService.getFair().subscribe(repsonse => {
      this.fair = repsonse.data  
     })
  }
  getFieldById(id:number) {
    this.fieldService.getFieldById(id).subscribe(repsonse => {
      this.field = repsonse.data  
      this.CreateForm()   
     })
  }

  initForm(){
    this.updateFieldForm=this.formBuilder.group({
      fieldId:["",Validators.required],
      fairId:["",Validators.required],
      fieldName:["",Validators.required],
      fieldType:["",Validators.required],
      fieldLable:["",Validators.required],
      order:["",Validators.required],
      fieldStatus:["",Validators.required],
    })
  }

 CreateForm(){
    this.updateFieldForm=this.formBuilder.group({
      fieldId:[this.field.fieldId,Validators.required],
      fairId:[this.field.fairId,Validators.required],
      fieldName:[this.field.fieldName,Validators.required],
      fieldType:[this.field.fieldType,Validators.required],
      fieldLable:[this.field.fieldLable,Validators.required],
      order:[this.field.order,Validators.required],
      fieldStatus:[this.field.fieldStatus,Validators.required],
    })
  }
  getField() {
    this.fieldService.getField().subscribe(repsonse => {
      this.fields = repsonse.data  
     })
  }

  update() {
    console.log(this.updateFieldForm.value);
    if (this.updateFieldForm.valid) {
        let updateModel = Object.assign({}, this.updateFieldForm.value);
        let currentField = this.fields.find(field => field.fieldId === updateModel.fieldId);
        
        if (currentField) {
            // Eğer order alanı değişmemişse doğrudan güncelleme işlemi yapılır
            if (currentField.order === updateModel.order) {
                this.fieldService.update(updateModel).subscribe(response => {
                    Swal.fire("Güncellendi", "Güncelleme işlemi başarılı", "success");
                    this.router.navigate(["/admin/list-field"]);
                });
            } else {
                // Eğer order alanı değişmişse mevcut order numarasını kontrol et
                let existingField = this.fields.find(field => field.order === updateModel.order );
                
                if (existingField) {
                    let maxOrder = Math.max(...this.fields.map(field => field.order));
                    let availableOrder = maxOrder + 1;
                    this.toastrService.error(`Order numarası zaten ${existingField.fieldName} alanı için kullanımda. Kullanılabilir numara: ${availableOrder}`, "Hata");
                } else {
                    this.fieldService.update(updateModel).subscribe(response => {
                        Swal.fire("Güncellendi", "Güncelleme işlemi başarılı", "success");
                        this.router.navigate(["/admin/list-field"]);
                    });
                }
            }
        }
    }
}


  updateBox()
  {
    Swal.fire({
      title:"Emin Misiniz",
      text:"Güncellemek İstediğinize Emin Misiniz ?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:'Evet, Güncellensin',
      cancelButtonText:'Hayır, Güncellenmesin'
    }).then((result=>{
      if(result.value){
        this.update();
        
      }
      else if (result.dismiss===Swal.DismissReason.cancel){
        Swal.fire("Güncellenmedi!","Güncelleme İşleminden Vazgeçildi","error")
      }
    }))
  }

}
