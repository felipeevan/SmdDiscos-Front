import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoTileComponent } from './produto-tile.component';

describe('ProdutoTileComponent', () => {
  let component: ProdutoTileComponent;
  let fixture: ComponentFixture<ProdutoTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
