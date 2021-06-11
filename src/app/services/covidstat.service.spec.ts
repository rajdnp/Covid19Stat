import { TestBed } from '@angular/core/testing';

import { CovidstatService } from './covidstat.service';

describe('CovidstatService', () => {
  let service: CovidstatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidstatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
