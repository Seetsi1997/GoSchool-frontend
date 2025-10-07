import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverHomeScreen } from './driver-home-screen';

describe('HomeScreen', () => {
  let component: DriverHomeScreen;
  let fixture: ComponentFixture<DriverHomeScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverHomeScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverHomeScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
