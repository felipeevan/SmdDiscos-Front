import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-compra-tile',
  templateUrl: './compra-tile.component.html',
  styleUrls: ['./compra-tile.component.scss']
})
export class CompraTileComponent implements OnInit {
  @Input()
  data!: any;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  add(){
    this.cartService.addItemToCart(this.data['id'], 1)
  }

  remove(){
    this.cartService.removeItemFromCart(this.data['id'])
  }

}
