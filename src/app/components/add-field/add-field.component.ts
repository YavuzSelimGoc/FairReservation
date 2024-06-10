import { FieldService } from './../../services/field.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fair } from './../../models/fair';
import { FairService } from './../../services/fair.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss']
})
export class AddFieldComponent implements OnInit {
  fieldAddForm:FormGroup;
  fair:Fair[]
  constructor(private formBuilder:FormBuilder,private fieldService:FieldService,private toastrService:ToastrService,
    private fairService:FairService,private router:Router) { this.createFieldAddForm() }
    
    ngOnInit(): void {
      
  this.getFair()
}
createFieldAddForm(){
  this.fieldAddForm=this.formBuilder.group({
    fairId :["",Validators.required],
    fieldName :["",Validators.required],
   fieldType :["",Validators.required],
   fieldLable :["",Validators.required],
   fieldStatus :[true,Validators.required],
   Order :[true,Validators.required],
  })
}
getFair() {
  this.fairService.getFair().subscribe(repsonse => {
    this.fair = repsonse.data  
  })
}
add(){
  console.log(this.fieldAddForm.value)
  if(this.fieldAddForm.valid){
    let fairModel =Object.assign({},this.fieldAddForm.value) 
    this.fieldService.add(fairModel).subscribe(response=>{
      this.router.navigate(["/admin/list-field"])
      this.toastrService.success("Alan Ekleme İşlemi Başarılı","Tebrikler")
    });
  }
  else {
      this.toastrService.error("Alan Ekleme İşlemi Başarısız","Hata")
  }  
 
}
}
