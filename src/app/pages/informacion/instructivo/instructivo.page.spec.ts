import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructivoPage } from './instructivo.page';

describe('InstructivoPage', () => {
  let component: InstructivoPage;
  let fixture: ComponentFixture<InstructivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
