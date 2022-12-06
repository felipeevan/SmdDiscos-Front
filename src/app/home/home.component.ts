import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  discos = [
  ]

  loaded = false;
  discosOriginal = []

  constructor(private router: Router, public clienteService: ClienteService,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.clienteService.listarProduto().toPromise().then(
      (response) => {
        let data = JSON.parse(response.data);
        this.discos = data;
        this.discosOriginal = this.discos
        this.loaded = true;
      }
    )
    this.searchService.getSearch().subscribe(res =>{
      this.discos = this.discosOriginal.filter((a: any) => {
        if(a['autor'].includes(res)||a['descricao'].includes(res)){
          return a;
        }
      })
    })
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  viewDetalheProduto(produto: any){
    this.router.navigate(['detalhesproduto'], { queryParams: { id: produto.id } },);
  }

}
