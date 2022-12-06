import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-specific-categoria',
  templateUrl: './specific-categoria.component.html',
  styleUrls: ['./specific-categoria.component.scss']
})
export class SpecificCategoriaComponent implements OnInit {
  discos = []
  id: any;
  discosOriginal = []
  loaded = false;

  constructor(private router: Router, private route: ActivatedRoute , public clienteService: ClienteService,
    private searchService: SearchService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.clienteService.listarProdutoDaCategoria(this.id).toPromise().then(
        (response) => {
          let data = JSON.parse(response.data);
          this.discos = data;
          this.discosOriginal = this.discos
          this.loaded = true
        }
      )
    });
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
