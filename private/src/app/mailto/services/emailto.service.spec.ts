import { TestBed } from '@angular/core/testing';

import { EmailtoService } from './emailto.service';

describe('EmailtoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailtoService = TestBed.get(EmailtoService);
    expect(service).toBeTruthy();
  });
});
