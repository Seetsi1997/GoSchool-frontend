import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReLocation } from './relocation';

describe('ReLocation', () => {
  let component: ReLocation;
  let fixture: ComponentFixture<ReLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
