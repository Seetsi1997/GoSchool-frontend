import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProfile } from './driver-profile';

describe('DriverProfile', () => {
  let component: DriverProfile;
  let fixture: ComponentFixture<DriverProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
