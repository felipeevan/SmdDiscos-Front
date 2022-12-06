import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LegendPosition } from '@swimlane/ngx-charts';
import { AdminService } from '../services/admin.service';
import { CategoriaDialogComponent } from '../tiles/categoria-dialog/categoria-dialog.component';
import { ConfirmDialogComponent } from '../tiles/confirm-dialog/confirm-dialog.component';
import { ProdutoDialogComponent } from '../tiles/produto-dialog/produto-dialog.component';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss']
})
export class AdminConsoleComponent implements OnInit {
  public legendPosition: LegendPosition = LegendPosition.Below;
  view: [number,number] = [700, 400];

  discosPorVenda = [
    {
      "name": "Em estoque",
      "value": 10
    },
    {
      "name": "Pouco Estoque",
      "value": 3
    },
    {
      "name": "Sem estoque",
      "value": 5
    },
  ];

  produtosForaDeEstoque: any = []

  categorias = []

  discos = []

  columnsCategorias = [
    {
      'name': 'descricao',
      'title': 'Nome'
    },
  ]

  columns = [
    {
      'name': 'nome',
      'title': 'Nome'
    },
    {
      'name': 'autor',
      'title': 'Autor'
    },
    {
      'name': 'quantidade',
      'title': 'Quantidade'
    },
    {
      'name': 'preco',
      'title': 'Preço'
    },
  ]

  displayedColumns = this.columns.map(c => c.name);
  displayedColumnsCategorias = this.columnsCategorias.map(c => c.name);


  constructor(public dialog: MatDialog, public adminService: AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.displayedColumns = ['foto', ...this.displayedColumns, 'star'];
    this.displayedColumnsCategorias = [...this.displayedColumnsCategorias, 'star'];
    this.setListCategorias()
    this.setListProdutos()
  }

  setProdutosForaDeEstoque(){
    let discosEmEstoque = 0;
    let discosForaEstoque = 0;
    this.discos.forEach(element => {
      if(element['quantidade']>0){
        discosEmEstoque++;
      }else{
        discosForaEstoque++
      }
    });
    this.produtosForaDeEstoque = [
      {
        'name':'Em estoque',
        "value": discosEmEstoque
      },
      {
        'name':'Fora de estoque',
        "value": discosForaEstoque
      }
    ]
  }

  setListCategorias(){
    this.adminService.listarCategoria().toPromise().then(
      (response) => {
        let data = JSON.parse(response.data);
        this.categorias = data;
      }
    )
  }
  
  setListProdutos(){
    this.adminService.listarProduto().toPromise().then(
      (response) => {
        let data = JSON.parse(response.data);
        this.discos = data;
        console.log(data)
        this.setProdutosForaDeEstoque()
      }
    )
  }

  addModal(){
    const dialogRef = this.dialog.open(ProdutoDialogComponent, {
      width: "600px",
      data: {
        'edit': false
      }
    });
    
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult===true){
        this.setListProdutos()
      }
    });
  }

  editModal(produto: any){
    const dialogRef = this.dialog.open(ProdutoDialogComponent, {
      width: "600px",
      data: {
        'edit': true,
        'produto': produto
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult===true){
        this.setListProdutos()
      }
    });
  }

  excluir(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        'title': "Deseja excluir?",
        'message': "Voce quer mesmo excluir esse item?"
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.adminService.excluirProduto(id).toPromise().then(
          (_) => {
            this.snackBar.open("Deletado com sucesso", "Ok",{
              horizontalPosition: "end",
              verticalPosition: "top",
            })
            this.setListProdutos()
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


  addCategoriaModal(){
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      width: "600px",
      data: {
        'edit': false
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult===true){
        this.setListCategorias()
      }
    });
  }

  editCategoriaModal(categoria: any){
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      width: "600px",
      data: {
        'edit': true,
        'categoria': categoria
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult===true){
        this.setListCategorias()
      }
    });
  }

  excluirCategoria(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        'title': "Deseja excluir?",
        'message': "Voce quer mesmo excluir esse item?"
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.adminService.excluirCategoria(id).toPromise().then(
          (_) => {
            this.snackBar.open("Deletado com sucesso", "Ok",{
              horizontalPosition: "end",
              verticalPosition: "top",
            })
            this.setListCategorias()
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
}
