import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdminUserComponent } from './panel-admin-user.component';

describe('PanelAdminUserComponent', () => {
  let component: PanelAdminUserComponent;
  let fixture: ComponentFixture<PanelAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAdminUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
