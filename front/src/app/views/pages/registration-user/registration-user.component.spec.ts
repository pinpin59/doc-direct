import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationUserComponent } from './registration-user.component';

describe('RegistationUserComponent', () => {
  let component: RegistrationUserComponent;
  let fixture: ComponentFixture<RegistrationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
