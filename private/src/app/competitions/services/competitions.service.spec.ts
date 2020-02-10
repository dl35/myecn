import { TestBed } from '@angular/core/testing';

import { CompetitionsService } from './competitions.service';

describe('CompetitionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompetitionsService = TestBed.inject(CompetitionsService);
    expect(service).toBeTruthy();
  });
});
