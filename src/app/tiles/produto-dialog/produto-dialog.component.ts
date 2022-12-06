import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-produto-dialog',
  templateUrl: './produto-dialog.component.html',
  styleUrls: ['./produto-dialog.component.scss']
})
export class ProdutoDialogComponent implements OnInit {
  editMode: boolean = false;
  produto: any;
  id!: number;
  title!: String;

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  produtoForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    categorias: new FormControl('', Validators.required),
    preco: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
  }, 
  { updateOn: 'submit' }
  )
  srcResult: any;
  nomeArquivo = "Selecione uma foto para o produto"
  categorias: any;

  constructor(public dialogRef: MatDialogRef<ProdutoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService,
    private snackBar: MatSnackBar) {
    this.title = data.edit?"Editar Produto": "Novo Produto";
    this.id = data.edit?data.produto.id:null;
    this.produto = data.edit?data.produto:null;
    this.editMode = data.edit;
  }

  ngOnInit(): void { 
    if(this.editMode){
      this.produtoForm.controls['nome'].setValue(this.produto?.nome)
      this.produtoForm.controls['autor'].setValue(this.produto?.autor)
      this.produtoForm.controls['descricao'].setValue(this.produto?.descricao)
      this.produtoForm.controls['preco'].setValue(this.produto?.preco)
      this.produtoForm.controls['quantidade'].setValue(this.produto?.quantidade)
      if(this.produto?.foto!=null && this.produto?.quantidade!=""){
        this.srcResult = this.produto?.foto
        this.nomeArquivo = "Clique para mudar o arquivo"
      }
    }

    this.adminService.listarCategoria().toPromise().then(
      (response) => {
        let data = JSON.parse(response.data);
        this.categorias = data;
      }
    )
  }

  salvar(){
    if (this.produtoForm.valid) {
      if(this.editMode){
        let body = {
          'id': this.id,
          'nome': this.produtoForm.controls['nome'].value,
          'autor': this.produtoForm.controls['autor'].value,
          'descricao': this.produtoForm.controls['descricao'].value,
          'preco': this.produtoForm.controls['preco'].value,
          'quantidade': this.produtoForm.controls['quantidade'].value,
          'foto': this.srcResult??""
          
        }

        this.adminService.editProduto(body).toPromise().then(
          (_) => {
            this.snackBar.open("Produto editado com sucesso", "Ok",{
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
      else{
        let categorias: any[] = this.produtoForm.controls['categorias'].value
        let body = {
          'nome': this.produtoForm.controls['nome'].value,
          'autor': this.produtoForm.controls['autor'].value,
          'descricao': this.produtoForm.controls['descricao'].value,
          'preco': this.produtoForm.controls['preco'].value,
          'quantidade': this.produtoForm.controls['quantidade'].value,
          'foto': this.srcResult??"",
          'categorias': categorias.join(',')
        }

        this.adminService.novoProduto(body).toPromise().then(
          (_) => {
            this.snackBar.open("Produto criado com sucesso", "Ok",{
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

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    let file = inputNode.files[0]
    if(file){
      this.nomeArquivo = file.name
      this.readFileAsync(file).then(res =>{
        this.srcResult = res
      })
    }

  }

  readFileAsync(file: any) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      reader.readAsDataURL(file);
    })
  }
  

}
