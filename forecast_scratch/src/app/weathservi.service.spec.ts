import { TestBed } from '@angular/core/testing';

import { WeathserviService } from './weathservi.service';

describe('WeathserviService', () => {
  let service: WeathserviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeathserviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
