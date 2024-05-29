import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdminHealthProfessionalComponent } from './panel-admin-health-professional.component';

describe('PanelAdminHealthProfessionalComponent', () => {
  let component: PanelAdminHealthProfessionalComponent;
  let fixture: ComponentFixture<PanelAdminHealthProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAdminHealthProfessionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelAdminHealthProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
