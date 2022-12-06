import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-detalhesproduto',
  templateUrl: './detalhesproduto.component.html',
  styleUrls: ['./detalhesproduto.component.scss']
})
export class DetalhesprodutoComponent implements OnInit {

  idProduto: any;
  quantidade: any = 1;
  produto: any = {};
  categorias = []
  constructor(public route: ActivatedRoute, private router: Router, private clienteService: ClienteService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        if(params['id']){
          this.idProduto = params['id']
        }else{
          this.router.navigate([''])
        }
      }
    );
    this.clienteService.getProdutoById(this.idProduto).toPromise().then(
      (response) => {
        let data = JSON.parse(response.data);
        this.produto = data;
        this.produto['categorias'] = JSON.parse(this.produto['categorias'])
      }
    ).catch(_ => this.router.navigate(['']))
  }


  addItemToCart(){
    this.cartService.addItemToCart(this.idProduto, this.quantidade)
  }

  addQuantidade(){
    this.quantidade++;
  }

  removeQuantidade(){
    this.quantidade==1?this.quantidade:this.quantidade--
  }
}
