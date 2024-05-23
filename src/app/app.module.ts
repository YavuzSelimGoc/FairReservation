import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    LoginLayoutComponent,
    HeaderComponent,
    ReservationComponent,
    UploadsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
