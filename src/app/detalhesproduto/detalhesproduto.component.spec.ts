import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesprodutoComponent } from './detalhesproduto.component';

describe('DetalhesprodutoComponent', () => {
  let component: DetalhesprodutoComponent;
  let fixture: ComponentFixture<DetalhesprodutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesprodutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesprodutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
