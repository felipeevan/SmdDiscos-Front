import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-pedidoscliente',
  templateUrl: './pedidoscliente.component.html',
  styleUrls: ['./pedidoscliente.component.scss']
})
export class PedidosclienteComponent implements OnInit {
  statuss = ["Pagamento: Crédito", "Status Pagamento: ", "Entrega: Física", "Status Entrega: "]
  pedidos: any;
  columns = [
    {
      'name': 'nome',
      'title': 'Nome'
    },
    {
      'name': 'preco',
      'title': 'Preço'
    },
    {
      'name': 'quantidade_venda',
      'title': 'Quantidade'
    },
    {
      'name': 'total',
      'title': 'Total'
    }
  ]

  displayedColumns = this.columns.map(c => c.name);

  constructor(private clienteService: ClienteService, private sessionService:SessionService) { }

  ngOnInit(): void {
    this.clienteService.listarPedidos(this.sessionService.getUserInfo()['id']).toPromise().then(res =>{
      let data = JSON.parse(res.data)
      this.pedidos = data;
      console.log(this.pedidos)
    })
  }

  getProdutos(produtos: any){
    let produtoTotal = 0;
    produtos.forEach((element:any) => {
      produtoTotal += (element.preco * element.quantidade_venda)
    });
    return produtoTotal;
  }
}
