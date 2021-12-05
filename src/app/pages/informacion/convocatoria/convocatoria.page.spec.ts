import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaPage } from './convocatoria.page';

describe('ConvocatoriaPage', () => {
  let component: ConvocatoriaPage;
  let fixture: ComponentFixture<ConvocatoriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
