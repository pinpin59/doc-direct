import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHealthProfessionalComponent } from './login-health-professional.component';

describe('LoginHealtProfessionalComponent', () => {
  let component: LoginHealthProfessionalComponent;
  let fixture: ComponentFixture<LoginHealthProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginHealthProfessionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginHealthProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
