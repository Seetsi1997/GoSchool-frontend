import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLocation } from './driver-location';

describe('DriverLocation', () => {
  let component: DriverLocation;
  let fixture: ComponentFixture<DriverLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
