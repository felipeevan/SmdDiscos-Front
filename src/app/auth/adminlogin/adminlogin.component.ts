import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.pattern(new RegExp("^\\S*$"))]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, 
  { updateOn: 'submit' }
  )

  @ViewChild('loginNgForm', {static: true}) formLogin: any;

  constructor(private router: Router, private adminService: AdminService,
    private snackBar: MatSnackBar, private sessionService: SessionService) {
  }
  
  ngOnInit(): void {
  }

  logar(){
    if (this.loginForm.valid) {
      let body = {
        'login':this.loginForm.controls['login'].value,
        'senha':this.loginForm.controls['senha'].value
      }

      this.adminService.loginAdmin(body).toPromise().then(
        (response) => {
          let data = JSON.parse(response.data);
          this.snackBar.open("Logado com sucesso", "Ok",{
            horizontalPosition: "end",
            verticalPosition: "top",
          })
          if(response.tipoSessao==1){
            this.sessionService.saveAdmin(data)
            this.router.navigate(['/dashboard']);
          }else{
            this.sessionService.saveCliente(data)
            this.router.navigate(['/home']);
          }
        },
        (error) =>{
          this.snackBar.open(error(), "Ok",{
            horizontalPosition: "end",
            verticalPosition: "top",
          })
        }
      )
    }
  }

}
