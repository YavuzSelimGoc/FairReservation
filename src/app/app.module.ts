import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AddFairComponent } from './components/add-fair/add-fair.component';
import { PdfSettingsComponent } from './components/pdf-settings/pdf-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    LoginLayoutComponent,
    HeaderComponent,
    ReservationComponent,
    UploadsComponent,
    NavbarComponent,
    LoginComponent,
    AddFairComponent,
    PdfSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    QRCodeModule,
    ToastrModule.forRoot({
      positionClass:"toast-top-right"
    })
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
