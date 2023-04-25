import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoHanoiComponent } from './disco-hanoi.component';

describe('DiscoHanoiComponent', () => {
  let component: DiscoHanoiComponent;
  let fixture: ComponentFixture<DiscoHanoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoHanoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoHanoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
