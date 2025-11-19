import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPopup } from './status-popup';

describe('StatusPopup', () => {
  let component: StatusPopup;
  let fixture: ComponentFixture<StatusPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
