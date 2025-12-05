import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCard } from './parent-card';

describe('ParentCard', () => {
  let component: ParentCard;
  let fixture: ComponentFixture<ParentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
