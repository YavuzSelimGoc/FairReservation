import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router,private toastrService:ToastrService) { this.loadExternalStylesheets();
  }
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      userName: ["",Validators.required],
      password:["",Validators.required]      
    })
  }
  login() {
    this.toastrService.info("Bilgilerinizin Kontrol Ediliyor","Lütfen Bekleyin");
    
    if (this.loginForm.valid) {
      const loginModel = this.loginForm.value;
  
      this.authService.login(loginModel).subscribe(
        (response: any) => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("tokenExpiration", response.expiration);
          this.toastrService.success("Giriş Başarılı");
          this.router.navigate(["admin"]);
        },
        (error) => {
          console.error(error);
          this.toastrService.error("Giriş Başarısız");
        }
      );
    } else {
      console.log("Form geçersiz");
    }
  }
  
  loadExternalStylesheets() {
    const stylesheets = [
      "../../../assets/plugins/fontawesome-free/css/all.min.css",
      "../../../assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css",
      "../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
      "../../../assets/css/adminlte.min.css"
    ];

    stylesheets.forEach((stylesheetUrl: string) => {
      const head = document.getElementsByTagName('head')[0];
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = stylesheetUrl;
      head.appendChild(style);
    });
  }


}