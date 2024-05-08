import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationHealthProfessionalComponent } from './registration-health-professional.component';

describe('RegistationHealtProfessionalComponent', () => {
  let component: RegistrationHealthProfessionalComponent;
  let fixture: ComponentFixture<RegistrationHealthProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationHealthProfessionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationHealthProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
