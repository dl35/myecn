import { TestBed, inject } from '@angular/core/testing';

import { ActuService } from './actu.service';

describe('ActuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActuService = TestBed.inject(ActuService);
    expect(service).toBeTruthy();
  });
});
