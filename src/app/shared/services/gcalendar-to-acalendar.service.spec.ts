import { TestBed } from '@angular/core/testing';

import { GCalendarToACalendarService } from './gcalendar-to-acalendar.service';

describe('GCalendarToACalendarService', () => {
  let service: GCalendarToACalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GCalendarToACalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
