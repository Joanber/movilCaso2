import { TestBed } from '@angular/core/testing';

import { ProcesosService } from './procesos.service';

describe('ProcesosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcesosService = TestBed.get(ProcesosService);
    expect(service).toBeTruthy();
  });
});
