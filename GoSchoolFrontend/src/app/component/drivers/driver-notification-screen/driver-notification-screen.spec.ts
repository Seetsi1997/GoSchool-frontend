import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverNotificationScreen } from './driver-notification-screen';

describe('DriverNotificationScreen', () => {
  let component: DriverNotificationScreen;
  let fixture: ComponentFixture<DriverNotificationScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverNotificationScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverNotificationScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
