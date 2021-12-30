import { TestBed } from '@angular/core/testing';

import { AnexoService } from './anexo.service';

describe('AnexoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnexoService = TestBed.get(AnexoService);
    expect(service).toBeTruthy();
  });
});
