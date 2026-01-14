import { TestBed } from '@angular/core/testing';

import { ServiceDriverNotification } from './service-driver-notification';

describe('ServiceDriverNotification', () => {
  let service: ServiceDriverNotification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDriverNotification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
