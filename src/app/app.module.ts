import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
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
import { LoaderComponent } from './components/loader/loader.component';
import { AddPdfSettingComponent } from './components/add-pdf-setting/add-pdf-setting.component';
import { ListFairComponent } from './components/list-fair/list-fair.component';
import { UpdateFairComponent } from './components/update-fair/update-fair.component';
import { FairPipe } from './pipes/fair.pipe';
import { ListReservationComponent } from './components/list-reservation/list-reservation.component';
import { ReservationPipe } from './pipes/reservation.pipe';
import { SuccesComponent } from './components/succes/succes.component';
import { ReservationDynamicComponent } from './components/reservation-dynamic/reservation-dynamic.component';
import { ListFieldComponent } from './components/list-field/list-field.component';
import { FieldPipe } from './pipes/field.pipe';
import { AddFieldComponent } from './components/add-field/add-field.component';
import { AddOptionComponent } from './components/add-option/add-option.component';
import { ListOptionComponent } from './components/list-option/list-option.component';

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
    PdfSettingsComponent,
    LoaderComponent,
    AddPdfSettingComponent,
    ListFairComponent,
    UpdateFairComponent,
    FairPipe,
    ListReservationComponent,
    ReservationPipe,
    SuccesComponent,
    ReservationDynamicComponent,
    ListFieldComponent,
    FieldPipe,
    AddFieldComponent,
    AddOptionComponent,
    ListOptionComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
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
