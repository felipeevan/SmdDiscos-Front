import { SidenavService } from './sidenav.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('drawer', {static: false}) public sidenav!: MatSidenav;
  @ViewChild('menu', {static: false}) public menu!: MatSidenav;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.setSidenavMenu(this.menu);
  }
}
