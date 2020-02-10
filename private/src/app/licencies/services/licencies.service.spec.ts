import { TestBed } from '@angular/core/testing';

import { LicenciesService } from './licencies.service';

describe('LicenciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LicenciesService = TestBed.inject(LicenciesService);
    expect(service).toBeTruthy();
  });
});
