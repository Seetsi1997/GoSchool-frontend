import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftPanel } from './admin-left-panel';

describe('AdminLeftPanel', () => {
  let component: AdminLeftPanel;
  let fixture: ComponentFixture<AdminLeftPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLeftPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLeftPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
