import { PdfSetting } from './../../models/pdfSetting';
import { PdfSettingService } from './../../services/pdf-setting.service';
import { DefaultFairService } from './../../services/default-fair.service';
import { FairService } from './../../services/fair.service';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from './../../services/reservation.service';
import { Field } from './../../models/field';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { OptionService } from './../../services/option.service';
import { FieldService } from './../../services/field.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldOption } from '../../models/formFieldOption';
import { FormField } from '../../models/formField';
import { Fair } from '../../models/fair';
import { Option } from '../../models/option';
declare var $: any;
declare var window:any;
declare var window2:any;

@Component({
  selector: 'app-reservation-dynamic',
  templateUrl: './reservation-dynamic.component.html',
  styleUrls: ['./reservation-dynamic.component.scss']
})
export class ReservationDynamicComponent implements OnInit{
  reservationForm:FormGroup
  field:Field[]
  formFields: FormField[] = [];
  option:Option[]
  defaultFairId:number
  pdfSetting:PdfSetting
  selectedPosition: string 
  selectedAlignment: string  // Varsayılan düzen
  imageSize: number  // Varsayılan resim boyutu
  qrSize: number 
  kvkk:boolean
  et:boolean
  load:boolean
  fair:Fair
  formModel:any;
  formModel2:any;
  constructor(private fairService:FairService,private defaultFairService:DefaultFairService,private pdfSettingService:PdfSettingService,private fieldService:FieldService,private optionService:OptionService, private reservationService:ReservationService  , private fb: FormBuilder,  private toastrService:ToastrService){}
ngOnInit(): void {
  this.getDefaultFairId()
  this.getPdfSettingsById()

  this.kvkk=false
  this.et=false
  this.load=true
  this.reservationForm = this.fb.group({});  

  this.formModel= new window.bootstrap.Modal(
    document.getElementById("kvkk")
  );
  this.formModel2= new window.bootstrap.Modal(
    document.getElementById("et")
  );
}
getField(id: number): void {
  this.fieldService.getFieldByFairId(id).subscribe(response => {
    const fields: Field[] = response.data;
    fields.forEach(field => {
      if (field.fieldStatus) {  // Check if fieldStatus is true
        const formField: FormField = {
          fieldId: field.fieldId,
          fieldType: field.fieldType,
          fieldName: field.fieldName
        };

        if (field.fieldType === 'select') {
          this.getOption(field.fieldId).then(options => {
            const validOptions = options.filter(option => option.optionStatus); // Check if optionStatus is true
            if (validOptions.length > 0) {
              formField.options = validOptions;
              this.addFieldToForm(formField);
            }
          });
        } else {
          this.addFieldToForm(formField);
        }
      }
    });
  });
}




getOption(fieldId: number): Promise<FormFieldOption[]> {
  return new Promise((resolve, reject) => {
    this.optionService.getOptionByFieldId(fieldId).subscribe(response => {
      const options: Option[] = response.data;
      const formFieldOptions: FormFieldOption[] = options.map(option => ({
        optionId: option.optionId,
        optionName: option.optionName,
        optionStatus: option.optionStatus
      }));
      resolve(formFieldOptions);
    }, error => reject(error));
  });
}
addFieldToForm(formField: FormField): void {
  this.formFields.push(formField);
  const control = this.fb.control('', Validators.required);
  this.reservationForm.addControl(formField.fieldName, control);
}
createPDF() {
  this.toastrService.info("Pdf Oluşturuluyor lütfen bekleyiniz")
  const pdf = new jsPDF();
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const qrImageUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:4200/success';
  const imageUrl = "../../../assets/img/otomativ-logo.png";

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

    pdf.save(this.reservationForm.get('name')?.value);
  });
}

getPdfSettingsById() {
  this.getDefaultFairId().then((defaultFairId) => {
    this.pdfSettingService.getPdfSettingByFairId(defaultFairId).subscribe((response) => {
      this.getField(defaultFairId)
      this.pdfSetting = response.data;
      this.selectedPosition = this.pdfSetting.positionSelect;
      this.selectedAlignment = this.pdfSetting.alignmentSelect;
      this.imageSize = this.pdfSetting.imageSize;
      this.qrSize = this.pdfSetting.qrSize;
    });
  }).catch((error) => {
    console.error("Error fetching default fair ID:", error);
  });
}
kvkkAccept(){
this.kvkk=true
this.closeModel()
}
etAccept(){
  this.et=true
  this.closeModelEt()
  }
  getFairById(id:number){
    this.fairService.getFairById(id).subscribe((response) => {
    this.fair=response.data
    this.load=false
    });
  }
  getDefaultFairId(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.defaultFairService.getDefaultFair().subscribe((response) => {
        const defaultFairId = response.data[0].fairId;
this.defaultFairId=defaultFairId
        this.getFairById(response.data[0].fairId)
        resolve(defaultFairId);
      }, (error) => {
        reject(error);
      });
    });
  }

add(){

  if (!this.et && !this.kvkk) {
    this.toastrService.error("Kvkk ve Elektronik İleti onay metinlerini onaylayınız.");
  } else if (!this.et) {
    this.toastrService.error("Elektronik İleti onay metnini onaylayınız");
  } else if (!this.kvkk) {
    this.toastrService.error("kvkk metnini onaylayınız");
  } else {

  if (this.reservationForm.valid) {
    const reservationModel = Object.assign({}, this.reservationForm.value);
    this.reservationService.add(reservationModel).subscribe(response => {
      this.createPDF();
      Swal.fire({
        title: 'Başarılı!',
        text: 'Rezervasyon başarıyla eklendi.',
        icon: 'success',
        confirmButtonText: 'Tamam'
      });
    }, error => {
      Swal.fire({
        title: 'Hata!',
        text: 'Rezervasyon eklenirken bir hata oluştu.',
        icon: 'error',
        confirmButtonText: 'Tamam'
      });
    });
  } else {
    this.toastrService.error("Rezervasyon Eklenemedi,Bilgileri Eksiksiz Giriniz");
  }    }
    
}

openModel(){
  this.formModel.show();
}
closeModel(){
  this.formModel.hide();
}
openModelEt(){
  this.formModel2.show();
}
closeModelEt(){
  this.formModel2.hide();
}


}
