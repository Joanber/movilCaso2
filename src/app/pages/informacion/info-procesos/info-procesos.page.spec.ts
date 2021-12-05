import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProcesosPage } from './info-procesos.page';

describe('InfoProcesosPage', () => {
  let component: InfoProcesosPage;
  let fixture: ComponentFixture<InfoProcesosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProcesosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProcesosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
