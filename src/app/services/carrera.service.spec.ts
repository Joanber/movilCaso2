import { TestBed } from '@angular/core/testing';

import { CarreraService } from './carrera.service';

describe('CarreraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarreraService = TestBed.get(CarreraService);
    expect(service).toBeTruthy();
  });
});
