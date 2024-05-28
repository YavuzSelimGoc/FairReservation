import { Fair } from './../../models/fair';
import { FairService } from './../../services/fair.service';
import { PdfSetting } from './../../models/pdfSetting';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfSettingService } from './../../services/pdf-setting.service';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { QRCodeModule } from 'angularx-qrcode';
import Swal from "sweetalert2"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf-settings',
  templateUrl: './pdf-settings.component.html',
  styleUrls: ['./pdf-settings.component.scss']
})
export class PdfSettingsComponent implements OnInit{
  pdfSetting:PdfSetting
  fair:Fair[]
  pdfSettingUpdateForm:FormGroup
  @ViewChild('previewContainer') previewContainer: ElementRef;

  constructor(private toastrService:ToastrService,private pdfSettingService:PdfSettingService,private fairService:FairService,private activatedroute:ActivatedRoute,private formBuilder:FormBuilder){this.initForm()}
  selectedPosition: string 
  selectedAlignment: string  
  selectedFair: string  
  fairId:number
  imageSize: number  
  qrSize: number 
  
  containerStyle = { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };

  ngOnInit(): void {
    this.activatedroute.params.subscribe(params=>{
      if(params["fairId"]){
        this.fairId=params["fairId"]
        this.getPdfSettingsByFairId(params["fairId"])
        this.getFair();
      }
      else{
        this.getPdfSettingsByFairId(params["fairId"])
        this.getFair();
      }
      })
  }
  getFair() {
    this.fairService.getFair().subscribe(repsonse => {
      this.fair = repsonse.data  
      console.log(this.fair)
    })
  }


  getPdfSettingsByFairId(id:number){
    this.pdfSettingService.getPdfSettingByFairId(id).subscribe((response) => {
      this.pdfSetting=response.data;
      this.selectedPosition=this.pdfSetting.positionSelect
      this.selectedAlignment=this.pdfSetting.alignmentSelect
      this.imageSize=this.pdfSetting.imageSize
      this.qrSize=this.pdfSetting.qrSize
    });
    this.fairService.getFairById(this.fairId).subscribe((response) => {
      this.selectedFair=response.data.fairName
    });
    
  }


  
  
  

  createPDF() {
    this.toastrService.info("Pdf Oluşturuluyor lütfen bekleyiniz")
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const qrImageUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:4200/admin/add-fair';
    const imageUrl = '../../../assets/img/logo.png';

    const positions = {
      'top-left': { x: 10, y: 10 },
      'top-center': { x: (pdfWidth - this.imageSize - this.qrSize) / 2, y: 10 },
      'top-right': { x: pdfWidth - this.imageSize - this.qrSize - 10, y: 10 },
      'middle-left': { x: 10, y: (pdfHeight - this.imageSize) / 2 },
      'center': { x: (pdfWidth - this.imageSize - this.qrSize) / 2, y: (pdfHeight - this.imageSize) / 2 },
      'middle-right': { x: pdfWidth - this.imageSize - this.qrSize - 10, y: (pdfHeight - this.imageSize) / 2 },
      'bottom-left': { x: 10, y: pdfHeight - this.imageSize - 10 },
      'bottom-center': { x: (pdfWidth - this.imageSize - this.qrSize) / 2, y: pdfHeight - this.imageSize - 10 },
      'bottom-right': { x: pdfWidth - this.imageSize - this.qrSize - 10, y: pdfHeight - this.imageSize - 10 }
    };

    const position = positions[this.selectedPosition];

    const loadImage = (url: string) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
      });
    };

    Promise.all([loadImage(qrImageUrl), loadImage(imageUrl)]).then(([qrImage, logoImage]) => {
      if (this.selectedAlignment === 'image-left') {
        // Resim sol, QR sağ
        pdf.addImage(logoImage, 'PNG', position.x, position.y, this.imageSize, this.imageSize);
        pdf.addImage(qrImage, 'JPEG', position.x + this.imageSize, position.y, this.qrSize, this.qrSize);
      } else {
        // Resim sağ, QR sol
        pdf.addImage(qrImage, 'JPEG', position.x, position.y, this.qrSize, this.qrSize);
        pdf.addImage(logoImage, 'PNG', position.x + this.qrSize, position.y, this.imageSize, this.imageSize);
      }

      pdf.save('document.pdf');
    });
  }

  initForm(){
    this.pdfSettingUpdateForm=this.formBuilder.group({
      id:["",Validators.required],
      fairId:["",Validators.required],
      alignmentSelect:["",Validators.required],
      positionSelect:["",Validators.required],
      imageSize:["",Validators.required],
      qrSize:["",Validators.required],
    })
  }

  update(){
    this.pdfSettingUpdateForm.controls['alignmentSelect'].setValue(this.selectedAlignment);
    this.pdfSettingUpdateForm.controls['positionSelect'].setValue(this.selectedPosition);
    this.pdfSettingUpdateForm.controls['fairId'].setValue(this.fairId);
    this.pdfSettingUpdateForm.controls['imageSize'].setValue(this.imageSize);
    this.pdfSettingUpdateForm.controls['qrSize'].setValue(this.qrSize);
    this.pdfSettingUpdateForm.controls['id'].setValue(this.pdfSetting.id);
console.log(this.pdfSettingUpdateForm.value)
    if(this.pdfSettingUpdateForm.valid){
      let updateModel =Object.assign({},this.pdfSettingUpdateForm.value) 
      this.pdfSettingService.update(updateModel).subscribe(response=>{
      Swal.fire("Güncellendi","Güncelleme işlemi başarılı","success")
      });
    }
    else {
  
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





