import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreen } from './add-screen';

describe('AddScreen', () => {
  let component: AddScreen;
  let fixture: ComponentFixture<AddScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
