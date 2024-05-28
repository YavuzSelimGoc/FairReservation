import { Fair } from './../../models/fair';
import { FairService } from './../../services/fair.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-fair',
  templateUrl: './update-fair.component.html',
  styleUrls: ['./update-fair.component.scss']
})
export class UpdateFairComponent implements OnInit{
  sayac=0
  selectedImage:string 
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private activatedroute:ActivatedRoute, private fairService:FairService,private router:Router) { this.createFairUpdateForm()}
  fairUpdateForm:FormGroup;
  fairId:number
fair:Fair
  image:string
  isTrue:boolean
  public resp: {dbPath:''};
  ngOnInit(): void {
    this.activatedroute.params.subscribe(params=>{
      if(params["fairId"]){
        this.fairId=params["fairId"]
        this.getFairById(params["fairId"])
      }
      else{
        this.getFairById(params["fairId"])

      }
      })
    
  }
  getFairById(id:number){
    this.fairService.getFairById(id).subscribe((response) => {
      this.fair=response.data
      this.image=response.data.fairLogo
      this.createFairUpdateFormFull()
    });
  }
  createFairUpdateForm(){
    this.fairUpdateForm=this.formBuilder.group({
      fairId :["",Validators.required],
      fairName :["",Validators.required],
     fairLogo :["",Validators.required],
     kvkkText :["",Validators.required],
     etText :["",Validators.required],
    })
  }
  createFairUpdateFormFull(){
    this.fairUpdateForm=this.formBuilder.group({
      fairId:this.fair.fairId,
      fairName:[this.fair.fairName,Validators.required],
      fairLogo:[this.fair.fairLogo,Validators.required],
      kvkkText:[this.fair.kvkkText,Validators.required],
      etText:[this.fair.etText,Validators.required],
      fairStatus:[this.fair.fairStatus],
    })

  }
  update(){
    if(this.sayac===0)
    { this.resp={
      dbPath:null
    }
    this.fairUpdateForm.controls['fairLogo'].setValue(this.fair.fairLogo);
    if(this.fairUpdateForm.valid){
      let fairModel =Object.assign({},this.fairUpdateForm.value) 
      this.fairService.update(fairModel).subscribe(response=>{
        this.router.navigate(["/admin/list-fair"])
        
      });
    }
    else {
      
    } }
    else if(this.sayac!==0){
      this.fairUpdateForm.controls['fairLogo'].setValue(this.resp.dbPath);
    if(this.fairUpdateForm.valid){
      let fairModel =Object.assign({},this.fairUpdateForm.value) 
      this.fairService.update(fairModel).subscribe(response=>{
        this.router.navigate(["/admin/list-fair"])
      });
    }
    else {} 
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
        Swal.fire("Güncellendi","Güncelleme işlemi başarılı","success")
        this.update();
       
      }
      else if (result.dismiss===Swal.DismissReason.cancel){
        Swal.fire("Güncellenmedi!","Güncelleme İşleminden Vazgeçildi","error")
      }
    }))
  }

  uploadFinished = (event) => { 
    this.sayac++
      this.resp = event; 
      this.selectedImage=this.resp.dbPath
  }

   createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }
}
