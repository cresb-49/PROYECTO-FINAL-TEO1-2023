import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorreHanoiComponent } from './torre-hanoi.component';

describe('TorreHanoiComponent', () => {
  let component: TorreHanoiComponent;
  let fixture: ComponentFixture<TorreHanoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorreHanoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorreHanoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
