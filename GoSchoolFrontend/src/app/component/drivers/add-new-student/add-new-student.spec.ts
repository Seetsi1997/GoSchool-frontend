import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStudent } from './add-new-student';

describe('AddNewStudent', () => {
  let component: AddNewStudent;
  let fixture: ComponentFixture<AddNewStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
