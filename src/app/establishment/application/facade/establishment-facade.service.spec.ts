import { TestBed } from '@angular/core/testing';

import { EstablishmentFacadeService } from './establishment-facade.service';

describe('EstablishmentFacadeService', () => {
  let service: EstablishmentFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablishmentFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
