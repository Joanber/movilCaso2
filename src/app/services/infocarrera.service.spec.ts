import { TestBed } from '@angular/core/testing';

import { InfocarreraService } from './infocarrera.service';

describe('InfocarreraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfocarreraService = TestBed.get(InfocarreraService);
    expect(service).toBeTruthy();
  });
});
