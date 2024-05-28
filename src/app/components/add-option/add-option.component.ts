import { OptionService } from './../../services/option.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.scss']
})
export class AddOptionComponent implements OnInit{
  optionAddForm:FormGroup
  fieldId:number
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,
    private optionService:OptionService,private router:Router,private activatedroute:ActivatedRoute) { this.createOptionAddForm() }
ngOnInit(): void {
  this.activatedroute.params.subscribe(params=>{
    if(params["fieldId"]){
      this.fieldId=params["fieldId"]
    }
    else{

    }
    })
}
createOptionAddForm(){
  console.log(this.fieldId)
  this.optionAddForm=this.formBuilder.group({
    fieldId :["",Validators.required],
    optionName :["",Validators.required],
  })
}
add(){
  this.optionAddForm.controls['fieldId'].setValue(this.fieldId);

  console.log(this.optionAddForm.value)
  if(this.optionAddForm.valid){
    let fairModel =Object.assign({},this.optionAddForm.value) 
    this.optionService.add(fairModel).subscribe(response=>{
      this.router.navigate(["/admin/list-option/"+this.fieldId])
      this.toastrService.success("Alan Ekleme İşlemi Başarılı","Tebrikler")
    });
  }
  else {
      this.toastrService.error("Alan Ekleme İşlemi Başarısız","Hata")
  }  
 
}
}
