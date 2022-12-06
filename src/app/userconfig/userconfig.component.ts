import { CepApiService } from './../services/cep.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from '../services/session.service';
import { ClienteService } from '../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../tiles/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-userconfig',
  templateUrl: './userconfig.component.html',
  styleUrls: ['./userconfig.component.scss']
})
export class UserconfigComponent implements OnInit {
  userForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    // email: new FormControl({value: '', disabled: true}),
    email: new FormControl('', [Validators.required, Validators.email]),
    login: new FormControl('', [Validators.required, this.ageRangeValidator]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  @ViewChild('formUser', {static: true}) formUser: any;

  formAddress = new FormGroup({
    cep: new FormControl('', Validators.required),
    rua: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    complemento: new FormControl(''), 
  })
  
  constructor(public dialog: MatDialog, private cepService: CepApiService, private clienteService: ClienteService,
    private sessionService: SessionService, private snackBar: MatSnackBar,
    ) {
  }

  user:any= {}

  ngOnInit(): void {
    this.user = this.sessionService.getUserInfo()
    this.setInfosOriginal()
  }

  ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value == 'FELIPE') {
        return { 'loginUsado': true };
    }
    return null;
  }

  setInfosOriginal(){
    let userinfo: any = this.user
    this.userForm.controls['nome'].setValue(userinfo?.nome)
    this.userForm.controls['email'].setValue(userinfo?.email)
    this.userForm.controls['login'].setValue(userinfo?.login)
    this.userForm.controls['senha'].setValue('********')
  }

  salvarInfo(){
    if (this.formUser.valid) {
      let body = {
        'nome': this.userForm.controls['nome'].value,
        'email':this.userForm.controls['email'].value,
        'login':this.userForm.controls['login'].value,
        'senha':this.userForm.controls['senha'].value=="********"?
        this.user.senha:this.userForm.controls['senha'].value,
        'endereco': 'Não informado'
      }

      this.clienteService.editarCliente(body).toPromise().then(
        (response) => {
          let data = JSON.parse(response.data);
          this.snackBar.open("Editado com sucesso", "Ok",{
            horizontalPosition: "end",
            verticalPosition: "top",
          })
          this.userForm.reset()
          this.formUser.resetForm();
          this.sessionService.setUserInfo(data)
          this.user = this.sessionService.getUserInfo()
          this.setInfosOriginal()
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

  salvarEndereco(){
    if (this.formAddress.valid) {

    }
  }

  excluirCadastro(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        'title': "PAROU, QUER FAZER ISSO MESMO???",
        'message': "Voce quer mesmo excluir seu cadastro?"
      },
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.clienteService.excluirCliente().toPromise().then(
          (response) => {
            let data = JSON.parse(response.data);
            this.snackBar.open("Editado com sucesso", "Ok",{
              horizontalPosition: "end",
              verticalPosition: "top",
            })
            this.sessionService.deslogar()
          },
          (error) =>{
            this.snackBar.open(error(), "Ok",{
              horizontalPosition: "end",
              verticalPosition: "top",
            })
          }
        )
      }
    });
  }

  resetEndereco(){
    this.formAddress.reset()
  }

  pesquisarCEP(){
    let cep = this.formAddress.controls['cep'].value;
    if(cep==undefined || cep.length!=9){
      return;
    }

    this.cepService.getCep(cep).toPromise().then(
      res => {
        this.formAddress.controls['rua'].setValue(res['logradouro'])
        this.formAddress.controls['bairro'].setValue(res['bairro'])
      }
    ).catch(error => {
      console.log(error)
    })
  }

  resetSenha(focus: boolean){
    if(focus && this.userForm.controls['senha'].value=='********'){
      this.userForm.controls['senha'].setValue('')
    }
    else{
      if(this.userForm.controls['senha'].value == ''){
        this.userForm.controls['senha'].setValue('********')
      }
    }
  }
}
