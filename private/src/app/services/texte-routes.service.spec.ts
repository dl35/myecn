import { TestBed } from '@angular/core/testing';

import { TexteRoutesService } from './texte-routes.service';

describe('TexteRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TexteRoutesService = TestBed.inject(TexteRoutesService);
    expect(service).toBeTruthy();
  });
});
