import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { QRCodeModule } from 'angularx-qrcode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FairService } from 'src/app/services/fair.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-fair',
  templateUrl: './add-fair.component.html',
  styleUrls: ['./add-fair.component.scss']
})
export class AddFairComponent implements OnInit{
  fairAddForm:FormGroup;
  image:string
   isTrue:boolean
   public resp: {dbPath:''};
   constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,
    private fairService:FairService,private router:Router) { }
   ngOnInit(): void {
  this.createFairAddForm()
   }
   createFairAddForm(){
    this.fairAddForm=this.formBuilder.group({
      fairName :["",Validators.required],
     fairLogo :["",Validators.required],
     kvkkText :["",Validators.required],
     etText :["",Validators.required],
    })
  }
  createPDF() {
    // Sabit resim olduğu için her zaman mevcuttur, doğrudan PDF oluşturabiliriz
    const pdf = new jsPDF(); 
    const qrImageUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:4200/admin/add-fair';

    // QR kodunu PDF'e ekle
    pdf.addImage(qrImageUrl, 'JPEG', 80, 40, 50, 50); // Orta üstte yer alması için koordinatları ayarla
    // Resmi PDF'e ekle
    pdf.addImage("../../../assets/img/logo.png" ,'PNG', 80, 100, 50, 50); // Orta altta yer alması için koordinatları ayarla
  
    pdf.save('document.pdf');
  }
  
  

  add(){
    this.fairAddForm.controls['fairLogo'].setValue(this.resp.dbPath);
    if(this.fairAddForm.valid){
      let fairModel =Object.assign({},this.fairAddForm.value) 
      this.fairService.add(fairModel).subscribe(response=>{
        this.router.navigate(["/admin"])
        this.toastrService.success("Fuar Ekleme İşlemi Başarılı","Tebrikler")
      });
    }
    else {
      console.log(this.fairAddForm.value)
        this.toastrService.error("Fuar Ekleme İşlemi Başarısız","Hata")
    }  
   
  }

  uploadFinished = (event) => { 
    this.resp = event; 
    this.image=this.resp.dbPath;

  }

   createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }

}
