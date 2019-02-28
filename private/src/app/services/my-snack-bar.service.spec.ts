import { TestBed } from '@angular/core/testing';

import { MySnackBarService } from './my-snack-bar.service';

describe('MySnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MySnackBarService = TestBed.get(MySnackBarService);
    expect(service).toBeTruthy();
  });
});
