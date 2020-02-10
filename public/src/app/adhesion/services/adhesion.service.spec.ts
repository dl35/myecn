import { TestBed } from '@angular/core/testing';

import { AdhesionService } from './adhesion.service';

describe('AdhesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdhesionService = TestBed.inject(AdhesionService);
    expect(service).toBeTruthy();
  });
});
