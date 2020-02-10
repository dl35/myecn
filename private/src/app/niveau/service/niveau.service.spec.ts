import { TestBed } from '@angular/core/testing';

import { NiveauService } from './niveau.service';

describe('NiveauService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NiveauService = TestBed.inject(NiveauService);
    expect(service).toBeTruthy();
  });
});
