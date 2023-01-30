import { TestBed } from '@angular/core/testing';

import { TimeManipulationService } from './time-manipulation.service';

describe('TimeManipulationService', () => {
  let service: TimeManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
