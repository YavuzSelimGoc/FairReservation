import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-pdf-settings',
  templateUrl: './pdf-settings.component.html',
  styleUrls: ['./pdf-settings.component.scss']
})
export class PdfSettingsComponent {
  @ViewChild('previewContainer') previewContainer: ElementRef;

  constructor(private toastrService:ToastrService){}
  selectedPosition: string = 'center'; 

  selectedAlignment: string = 'image-left'; // Varsayılan düzen
  imageSize: number = 50; // Varsayılan resim boyutu
  qrSize: number = 50;


  
  containerStyle = { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };



  
  
  

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


}