/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LostCasesComponent } from './lost-cases.component';

describe('LostCasesComponent', () => {
  let component: LostCasesComponent;
  let fixture: ComponentFixture<LostCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
