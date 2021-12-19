import { TestBed } from '@angular/core/testing';

import { ConvocatoriaService } from './convocatoria.service';

describe('ConvocatoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConvocatoriaService = TestBed.get(ConvocatoriaService);
    expect(service).toBeTruthy();
  });
});
