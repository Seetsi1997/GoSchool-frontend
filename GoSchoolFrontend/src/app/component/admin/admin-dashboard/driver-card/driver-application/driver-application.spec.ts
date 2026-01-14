import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverApplication } from './driver-application';

describe('DriverApplication', () => {
  let component: DriverApplication;
  let fixture: ComponentFixture<DriverApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverApplication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverApplication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
