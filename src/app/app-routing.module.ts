import { PdfSettingsComponent } from './components/pdf-settings/pdf-settings.component';
import { AddFairComponent } from './components/add-fair/add-fair.component';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: "", component: PublicLayoutComponent, children: [
      {path:"",component:ReservationComponent},

    ]
  },
  {
    path: "login", component: LoginComponent, children: [
  
      {path:"",component:LoginComponent},

    ]
  },
  {
    path: "admin", component: PrivateLayoutComponent , canActivate:[LoginGuard], children: [

      {path:"add-fair",component:AddFairComponent},
      {path:"pdf-settings",component:PdfSettingsComponent},

    ]
  }



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
