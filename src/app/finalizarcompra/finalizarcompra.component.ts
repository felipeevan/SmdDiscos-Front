import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ClienteService } from '../services/cliente.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-finalizarcompra',
  templateUrl: './finalizarcompra.component.html',
  styleUrls: ['./finalizarcompra.component.scss']
})
export class FinalizarcompraComponent implements OnInit {
  cart_items: any;
  precoTotalProdutos: any = 0;
  formaEntrega: any = "0";
  formaPagamento: any = "0";
  cliente: any;

  constructor(public cartService: CartService, public http: HttpClient, private sessionService: SessionService, 
    private snackBar: MatSnackBar, private clienteSerive : ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCarrinho().subscribe(
      (res: any[]) => {
        this.cart_items = res
        let total = 0;
        this.cart_items?.forEach((el: any) => {
          this.http.post(`/smdecommerce/ObterProduto`, {"id": el['id']}).toPromise().then((res: any) =>{
            let data = JSON.parse(res.data);
            let precototal = data['preco']*el['q']
            total += precototal;
            this.precoTotalProdutos = total;
          })
        });
      }
    )

    this.cliente = this.sessionService.getUserInfo()
    
    this.cartService.loadCarrinho()
  }

  concluirCompra(){
    this.clienteSerive.realizarCompra(this.cliente['id'], this.formaPagamento, this.formaEntrega, this.cart_items).toPromise().then(_ =>{
      this.snackBar.open("Pedido realizado sucesso", "Ok",{
        horizontalPosition: "end",
        verticalPosition: "top",
      })
      this.cartService.clearCart()
      this.router.navigate(['home']);
    }).catch(error => {
      this.snackBar.open(error(), "Ok",{
        horizontalPosition: "end",
        verticalPosition: "top",
      })
    });
  }

  naoPodePedir(){
    if(this.precoTotalProdutos==0){
      return false;
    }
    if(this.formaEntrega==null){
      return false;
    }
    if(this.formaPagamento==null){
      return false;
    }
    return true;
  }

}
