import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarcompraComponent } from './finalizarcompra.component';

describe('FinalizarcompraComponent', () => {
  let component: FinalizarcompraComponent;
  let fixture: ComponentFixture<FinalizarcompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizarcompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarcompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
