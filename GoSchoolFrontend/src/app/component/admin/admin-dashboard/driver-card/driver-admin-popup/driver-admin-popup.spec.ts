import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAdminPopup } from './driver-admin-popup';

describe('DriverAdminPopup', () => {
  let component: DriverAdminPopup;
  let fixture: ComponentFixture<DriverAdminPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverAdminPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverAdminPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
