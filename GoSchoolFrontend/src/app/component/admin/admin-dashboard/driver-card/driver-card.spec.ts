import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCard } from './driver-card';

describe('DriverCard', () => {
  let component: DriverCard;
  let fixture: ComponentFixture<DriverCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
