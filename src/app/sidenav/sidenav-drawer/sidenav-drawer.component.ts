import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sidenav-drawer',
  templateUrl: './sidenav-drawer.component.html',
  styleUrls: ['./sidenav-drawer.component.scss']
})
export class SidenavDrawerComponent implements OnInit {
  cart_items: any = []
  user: any;
  constructor(private router: Router, private cartService: CartService, private sessionService:SessionService) { }

  ngOnInit(): void {
    this.cartService.getCarrinho().subscribe(
      res => {
        this.cart_items = res
      }
    )
    this.cartService.loadCarrinho()

    this.user = this.sessionService.getUserInfo();
  }

  irAoPagamento(){
    this.router.navigate(['finalizarCompra']);
  }


}
