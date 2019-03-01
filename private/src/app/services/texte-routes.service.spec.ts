import { TestBed } from '@angular/core/testing';

import { TexteRoutesService } from './texte-routes.service';

describe('TexteRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TexteRoutesService = TestBed.get(TexteRoutesService);
    expect(service).toBeTruthy();
  });
});
