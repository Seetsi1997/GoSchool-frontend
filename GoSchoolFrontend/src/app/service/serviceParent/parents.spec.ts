import { TestBed } from '@angular/core/testing';

import { Parents } from './parents';

describe('Parents', () => {
  let service: Parents;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Parents);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
