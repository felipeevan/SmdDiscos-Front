import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-tile',
  templateUrl: './produto-tile.component.html',
  styleUrls: ['./produto-tile.component.scss']
})
export class ProdutoTileComponent implements OnInit {
  @Input()
  data!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
