import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: ['./menu-drawer.component.scss']
})
export class MenuDrawerComponent implements OnInit {
  categorias: any = [
  ]

  
  constructor(public clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.clienteService.listarCategoria().toPromise().then(
      (response) => {
        let data = JSON.parse(response.data);
        this.categorias = data;
      }
    )
  }


  goToCategoria(categoria: any){
    this.router.navigate(['home/' + categoria['id']]);
  }
}
