import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplaintComponent } from './raise-complaint.component';

describe('RaiseComplaintComponent', () => {
  let component: RaiseComplaintComponent;
  let fixture: ComponentFixture<RaiseComplaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaiseComplaintComponent]
    });
    fixture = TestBed.createComponent(RaiseComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
