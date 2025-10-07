import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListScreen } from './view-list-screen';

describe('ViewListScreen', () => {
  let component: ViewListScreen;
  let fixture: ComponentFixture<ViewListScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
