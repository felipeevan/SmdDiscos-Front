import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosclienteComponent } from './pedidoscliente.component';

describe('PedidosclienteComponent', () => {
  let component: PedidosclienteComponent;
  let fixture: ComponentFixture<PedidosclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
