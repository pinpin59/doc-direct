import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistationHealtProfessionalComponent } from './registation-healt-professional.component';

describe('RegistationHealtProfessionalComponent', () => {
  let component: RegistationHealtProfessionalComponent;
  let fixture: ComponentFixture<RegistationHealtProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistationHealtProfessionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistationHealtProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
