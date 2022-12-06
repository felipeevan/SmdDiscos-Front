import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraTileComponent } from './compra-tile.component';

describe('CompraTileComponent', () => {
  let component: CompraTileComponent;
  let fixture: ComponentFixture<CompraTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
