import { TestBed } from '@angular/core/testing';

import { EngageService } from './engage.service';

describe('EngageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EngageService = TestBed.inject(EngageService);
    expect(service).toBeTruthy();
  });
});
