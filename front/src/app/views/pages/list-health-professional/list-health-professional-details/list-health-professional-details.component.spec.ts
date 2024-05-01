import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHealthProfessionalDetailsComponent } from './list-health-professional-details.component';

describe('ListHealthProfessionalDetailsComponent', () => {
  let component: ListHealthProfessionalDetailsComponent;
  let fixture: ComponentFixture<ListHealthProfessionalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHealthProfessionalDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListHealthProfessionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
