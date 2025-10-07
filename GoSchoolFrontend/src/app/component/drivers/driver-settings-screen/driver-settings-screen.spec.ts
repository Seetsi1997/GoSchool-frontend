import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSettingsScreen } from './driver-settings-screen';

describe('DriverSettingsScreen', () => {
  let component: DriverSettingsScreen;
  let fixture: ComponentFixture<DriverSettingsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverSettingsScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverSettingsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
