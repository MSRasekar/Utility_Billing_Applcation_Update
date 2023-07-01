import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDetailsComponent } from './meter-details.component';

describe('MeterDetailsComponent', () => {
  let component: MeterDetailsComponent;
  let fixture: ComponentFixture<MeterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterDetailsComponent]
    });
    fixture = TestBed.createComponent(MeterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
