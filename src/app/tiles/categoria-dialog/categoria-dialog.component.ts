import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-categoria-dialog',
  templateUrl: './categoria-dialog.component.html',
  styleUrls: ['./categoria-dialog.component.scss']
})
export class CategoriaDialogComponent implements OnInit {
  editMode: boolean = false;
  categoria: any;
  id!: number;
  title!: String;

  categoriaForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
  }, 
  { updateOn: 'submit' }
  )

  constructor(public dialogRef: MatDialogRef<CategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService,
    private snackBar: MatSnackBar) {
    this.title = data.edit?"Editar Categoria": "Novo Categoria";
    this.id = data.edit?data.categoria.id:null;
    this.categoria = data.edit?data.categoria:null;
    this.editMode = data.edit;
  }

  ngOnInit(): void {
    if(this.editMode){
      this.categoriaForm.controls['nome'].setValue(this.categoria?.descricao)
    }
  }

  salvar(){
    if (this.categoriaForm.valid) {
      if(this.editMode){
        let body = {
          'id': this.id,
          'descricao': this.categoriaForm.controls['nome'].value,
        }
  
        this.adminService.editCategoria(body).toPromise().then(
          (_) => {
            this.snackBar.open("Categoria editada com sucesso", "Ok",{
              horizontalPosition: "end",
              verticalPosition: "top",
            })
            this.dialogRef.close(true)
          },
          (error) =>{
            this.snackBar.open(error(), "Ok",{
              horizontalPosition: "end",
              verticalPosition: "top",
            })
          }
        )
      }else{
        let body = {
          'descricao': this.categoriaForm.controls['nome'].value,
        }
  
        this.adminService.novaCategoria(body).toPromise().then(
          (_) => {
            this.snackBar.open("Categoria criada com sucesso", "Ok",{
              horizontalPosition: "end",
              verticalPosition: "top",
            })
            this.dialogRef.close(true)
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



}
