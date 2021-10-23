/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuarantineReferComponent } from './quarantine-refer.component';

describe('QuarantineReferComponent', () => {
  let component: QuarantineReferComponent;
  let fixture: ComponentFixture<QuarantineReferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarantineReferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarantineReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
