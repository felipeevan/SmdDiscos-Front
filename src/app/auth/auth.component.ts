import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { SessionService } from '../services/session.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.pattern(new RegExp("^\\S*$"))]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, 
  { updateOn: 'submit' }
  )

  @ViewChild('loginNgForm', {static: true}) formLogin: any;
  @ViewChild('registroNgForm', {static: true}) formRegistro: any;

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('senha')?.value ;
    let confirmPass = group.get('csenha')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  matcher = new MyErrorStateMatcher();

  registroForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    login: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern(new RegExp("^\\S*$"))]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
    csenha: new FormControl('', [Validators.required, Validators.minLength(8), this.checkPasswords]),
  },
  { updateOn: 'submit', validators: this.checkPasswords },
  )


  constructor(private router: Router, private clienteService: ClienteService,
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

      this.clienteService.loginCliente(body).toPromise().then(
        (response) => {
          let data = JSON.parse(response.data);
          this.snackBar.open("Logado com sucesso", "Ok",{
            horizontalPosition: "end",
            verticalPosition: "top",
          })
          this.loginForm.reset()
          this.formLogin.resetForm();
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

  registrar(){
    if(this.registroForm.valid){
      
      let body = {
        'nome': this.registroForm.controls['nome'].value,
        'email':this.registroForm.controls['email'].value,
        'login':this.registroForm.controls['login'].value,
        'senha':this.registroForm.controls['senha'].value
      }

      this.clienteService.registrarCliente(body).toPromise().then(
        (response) => {
          let data = JSON.parse(response.data);
          this.snackBar.open("Criado com sucesso", "Ok",{
            horizontalPosition: "end",
            verticalPosition: "top",
          })
          this.registroForm.reset()
          this.formRegistro.resetForm();
          this.sessionService.saveCliente(data)
          this.router.navigate(['/home']);
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

  resetForm(){
    this.formLogin.resetForm();
    this.formRegistro.resetForm();
  }
}
