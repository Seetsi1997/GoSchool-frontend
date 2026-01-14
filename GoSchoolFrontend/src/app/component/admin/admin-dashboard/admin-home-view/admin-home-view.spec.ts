import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeView } from './admin-home-view';

describe('AdminHomeView', () => {
  let component: AdminHomeView;
  let fixture: ComponentFixture<AdminHomeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHomeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
