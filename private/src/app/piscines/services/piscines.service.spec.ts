import { TestBed } from '@angular/core/testing';

import { PiscinesService } from './piscines.service';

describe('PiscinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PiscinesService = TestBed.inject(PiscinesService);
    expect(service).toBeTruthy();
  });
});
