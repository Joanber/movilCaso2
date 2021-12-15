import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraPage } from './carrera.page';

describe('CarreraPage', () => {
  let component: CarreraPage;
  let fixture: ComponentFixture<CarreraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarreraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarreraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
