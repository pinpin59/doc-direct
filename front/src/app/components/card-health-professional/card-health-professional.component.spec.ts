import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHealthProfessionalComponent } from './card-health-professional.component';

describe('CardHealthProfessionalComponent', () => {
  let component: CardHealthProfessionalComponent;
  let fixture: ComponentFixture<CardHealthProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHealthProfessionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardHealthProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
