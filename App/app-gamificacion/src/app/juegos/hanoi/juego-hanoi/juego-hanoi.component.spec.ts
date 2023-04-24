import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoHanoiComponent } from './juego-hanoi.component';

describe('JuegoHanoiComponent', () => {
  let component: JuegoHanoiComponent;
  let fixture: ComponentFixture<JuegoHanoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoHanoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoHanoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
