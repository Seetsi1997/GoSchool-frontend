import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProofOfPayment } from './upload-proof-of-payment';

describe('UploadProofOfPayment', () => {
  let component: UploadProofOfPayment;
  let fixture: ComponentFixture<UploadProofOfPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadProofOfPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadProofOfPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
