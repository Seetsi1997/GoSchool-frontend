import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentInfo } from './add-student-info';

describe('AddStudentInfo', () => {
  let component: AddStudentInfo;
  let fixture: ComponentFixture<AddStudentInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudentInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
