import { SidenavService } from './../sidenav/sidenav.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { ConfirmDialogComponent } from '../tiles/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logado: boolean | undefined;
  isAdmin: boolean | undefined;
  quantidadeCarrinho: any;
  search: any;
  
  constructor(private sidenav: SidenavService, private router: Router, public dialog: MatDialog,
    private sessionService: SessionService, private snackBar: MatSnackBar, private cartService: CartService,
    public searchService: SearchService) { }

  ngOnInit(): void {
    this.logado = this.sessionService.isLogged()
    this.isAdmin = this.sessionService.isAdmin()
    this.cartService.getCarrinhoQuantity().subscribe(res =>{
      this.quantidadeCarrinho = res
    })
    this.cartService.loadCarrinhoQuantity()
  }

  toggleRightSidenav() {
    this.sidenav.toggle();
  }

  searchByKey(){
    this.searchService.searchNext(this.search)
  }

  toggleMenuSidenav() {
    this.sidenav.toggleMenu();
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }
  
  deslogar(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        'title': "Deseja realmente deslogar?",
      }
    });

    dialogRef.afterClosed().subscribe(async dialogResult => {
      if(dialogResult===true){
        this.sessionService.deslogar()
      }
    });

  }
}
