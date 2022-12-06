import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosadminComponent } from './pedidosadmin.component';

describe('PedidosadminComponent', () => {
  let component: PedidosadminComponent;
  let fixture: ComponentFixture<PedidosadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
