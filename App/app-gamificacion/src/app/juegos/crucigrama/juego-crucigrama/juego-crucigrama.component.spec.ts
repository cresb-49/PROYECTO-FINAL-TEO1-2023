import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoCrucigramaComponent } from './juego-crucigrama.component';

describe('JuegoCrucigramaComponent', () => {
  let component: JuegoCrucigramaComponent;
  let fixture: ComponentFixture<JuegoCrucigramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoCrucigramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoCrucigramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
