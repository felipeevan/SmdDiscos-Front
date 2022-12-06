import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificCategoriaComponent } from './specific-categoria.component';

describe('SpecificCategoriaComponent', () => {
  let component: SpecificCategoriaComponent;
  let fixture: ComponentFixture<SpecificCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
