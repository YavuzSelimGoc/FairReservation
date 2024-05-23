import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { ReservationComponent } from './components/reservation/reservation.component';

const routes: Routes = [
  {
    path: "", component: PublicLayoutComponent, children: [
      {path:"",component:ReservationComponent},

    ]
  },
  {
    path: "login", component: LoginLayoutComponent, children: [
  

    ]
  },
  {
    path: "admin", component: PrivateLayoutComponent , children: [

   
    ]
  }



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
