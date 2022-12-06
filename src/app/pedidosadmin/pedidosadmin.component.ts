import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-pedidosadmin',
  templateUrl: './pedidosadmin.component.html',
  styleUrls: ['./pedidosadmin.component.scss']
})
export class PedidosadminComponent implements OnInit, AfterViewInit  {
  vendas = [
    {'cliente':1},{'cliente':2},{'cliente':3},{'cliente':4},
    {'cliente':5},{'cliente':6},{'cliente':7},{'cliente':8},
    {'cliente':9},{'cliente':10},{'cliente':11},{'cliente':12},
  ]

  columns = [
    {
      'name': 'data_hora',
      'title': 'Data'
    },
    {
      'name': 'cliente',
      'title': 'Cliente'
    },
    {
      'name': 'pagamento',
      'title': 'Pagamento'
    },
    {
      'name': 'entrega',
      'title': 'Entrega'
    },
    {
      'name': 'total',
      'title': 'Total'
    },
  ]

  displayedColumns = this.columns.map(c => c.name);
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;
  @ViewChild(MatSort)
  sort!: MatSort | null;
  
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = [...this.displayedColumns, 'star'];
    this.dataSource = new MatTableDataSource(this.vendas);
  }

  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  view(venda: any){
    
  }

}
