import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHealthProfessionalComponent } from './profile-health-professional.component';

describe('ProfileHealthProfessionalComponent', () => {
  let component: ProfileHealthProfessionalComponent;
  let fixture: ComponentFixture<ProfileHealthProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileHealthProfessionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileHealthProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
