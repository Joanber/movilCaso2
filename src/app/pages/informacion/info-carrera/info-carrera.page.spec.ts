import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCarreraPage } from './info-carrera.page';

describe('InfoCarreraPage', () => {
  let component: InfoCarreraPage;
  let fixture: ComponentFixture<InfoCarreraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCarreraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCarreraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
