import { Fair } from './../../models/fair';
import { DefaultFairService } from './../../services/default-fair.service';
import { City } from './../../models/city';
import { CityService } from './../../services/city.service';
import { CountryService } from './../../services/country.service';
import { Country } from './../../models/country';
import { ToastrService } from 'ngx-toastr';
import { PdfSettingService } from './../../services/pdf-setting.service';
import { FairService } from './../../services/fair.service';
import { ReservationService } from './../../services/reservation.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { QRCodeModule } from 'angularx-qrcode';
import Swal from 'sweetalert2';
import { PdfSetting } from 'src/app/models/pdfSetting';
declare var $: any;
declare var window:any;
declare var window2:any;
import Inputmask from "inputmask";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit ,AfterViewInit{

  selectParticipationType: string = "Katılım Türü*";
  selectSector: string = "Sektör*";
  selectCountry: string = "Ülke*";
  selectCity: string = "Şehir*";
  pdfSetting:PdfSetting
  countryName:string
  fair:Fair
  kvkk:boolean
  et:boolean
  load:boolean
  defaultFairId:number
  unmaskedPhoneNum:string
  selectedPosition: string 
  selectedAlignment: string  // Varsayılan düzen
  imageSize: number  // Varsayılan resim boyutu
  qrSize: number 
  country:Country[]
  City:City[]
  constructor(private formBuilder:FormBuilder,private defaultFairService:DefaultFairService,private countryService:CountryService,private cityService:CityService,private fairService:FairService,private pdfSettingService:PdfSettingService,private toastrService:ToastrService,private router:Router,private reservationService:ReservationService){ this.createReservationAddForm()}
  formModel:any;
  formModel2:any;
  reservationAddForm:FormGroup;
  ngOnInit(): void {
    this.kvkk=false
    this.et=false
    this.load=true
    this.getDefaultFairId()
    this.getPdfSettingsById()
    this.getCountry()
    this.formModel= new window.bootstrap.Modal(
      document.getElementById("kvkk")
    );
    this.formModel2= new window.bootstrap.Modal(
      document.getElementById("et")
    );
  }
  get f() { return this.reservationAddForm.controls; }
  ngAfterViewInit(): void {
    
    // Phone number mask
    const phoneNumberElement = document.getElementById('phoneNumber');
    if (phoneNumberElement) {
      Inputmask({
        mask: "+\\90 599-999-9999",
        placeholder: '_',
        showMaskOnHover: false,
        showMaskOnFocus: true,
        definitions: {
          '5': {
            validator: '[5]',
            cardinality: 1,
            casing: 'lower'
          }
        }
      }).mask(phoneNumberElement);
    }
  
  
  }
  onPhoneNumberBlur(event: any) {
    const inputValue = event.target.value; // Input değerini al
    this.unmaskedPhoneNum = this.unmaskPhoneNumber(inputValue); // Değer için maskeleme fonksiyonunu çağır
  }
  unmaskPhoneNumber(maskedValue: string) {
    console.log(maskedValue)
    return maskedValue.replace(/-/g, '');
  }
 getPdfSettingsById() {
  this.getDefaultFairId().then((defaultFairId) => {
    console.log(defaultFairId)
    this.pdfSettingService.getPdfSettingByFairId(defaultFairId).subscribe((response) => {
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
    console.log(this.fair)
    this.load=false
    });
  }
  getDefaultFairId(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.defaultFairService.getDefaultFair().subscribe((response) => {
        const defaultFairId = response.data[0].fairId;
        this.getFairById(response.data[0].fairId)
        this.defaultFairId = defaultFairId;
        resolve(defaultFairId);
      }, (error) => {
        reject(error);
      });
    });
  }
  onCountryChange(event: any) {
    const countryId = event.target.value;
    if (countryId) {
      this.getCityByCountryId(countryId);
      this.getCountryById(countryId)
    }
  }
  getCountryById(id:number){
    this.countryService.getCountryById(id).subscribe((response) => {
    this.countryName=response.data.countryName
    });
  }

  getCityByCountryId(id: number) {
    this.cityService.getCityByCountryId(id).subscribe((response) => {
      this.City = response.data;
    });
  }
  getCountry(){
    this.countryService.getCountry().subscribe((response) => {
    this.country=response.data
    });
  }
  createReservationAddForm(){
    this.reservationAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      mail: ["", [Validators.required, Validators.email]],
      participationType: ["" , Validators.required],
      sector: ["" , Validators.required],
      company: ["" , Validators.required],
      task: ["" , Validators.required],
      country: ["" , Validators.required],
      city: ["" , Validators.required]
  });
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

      pdf.save(this.reservationAddForm.get('name').value);
    });
  }
  add() {
    if (!this.et && !this.kvkk) {
      this.toastrService.error("Kvkk ve Elektronik İleti onay metinlerini onaylayınız.");
    } else if (!this.et) {
      this.toastrService.error("Elektronik İleti onay metnini onaylayınız");
    } else if (!this.kvkk) {
      this.toastrService.error("kvkk metnini onaylayınız");
    } else {
      if (this.reservationAddForm.valid) {
        this.reservationAddForm.controls['country'].setValue(this.countryName);
          let reservationModel = Object.assign({}, this.reservationAddForm.value);
          this.reservationService.add(reservationModel).subscribe(response => {
            this.createPDF()
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
          console.log("Rezervasyon Eklenemedi");
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

  createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
    
  }
}
