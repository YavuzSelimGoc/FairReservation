import { SuccesComponent } from './components/succes/succes.component';
import { ListReservationComponent } from './components/list-reservation/list-reservation.component';
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
import { AddPdfSettingComponent } from './components/add-pdf-setting/add-pdf-setting.component';
import { ListFairComponent } from './components/list-fair/list-fair.component';
import { UpdateFairComponent } from './components/update-fair/update-fair.component';

const routes: Routes = [
  {
    path: '', component: PublicLayoutComponent, children: [
      { path: '', component: ReservationComponent },
      { path: 'success', component: SuccesComponent },
    ]
  },
  {
    path: 'login', component: LoginLayoutComponent, children: [
      { path: '', component: LoginComponent },
    ]
  },
  {
    path: 'admin', component: PrivateLayoutComponent,canActivate:[LoginGuard], children: [
      { path: 'add-fair', component: AddFairComponent ,canActivate:[LoginGuard]},
      { path: 'update-pdfSettings/:fairId', component: PdfSettingsComponent ,canActivate:[LoginGuard]},
      { path: 'update-fair/:fairId', component: UpdateFairComponent,canActivate:[LoginGuard] },
      { path: 'add-pdf-settings', component: AddPdfSettingComponent,canActivate:[LoginGuard] },
      { path: 'list-fair', component: ListFairComponent,canActivate:[LoginGuard] },
      { path: 'list-reservation', component: ListReservationComponent ,canActivate:[LoginGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
