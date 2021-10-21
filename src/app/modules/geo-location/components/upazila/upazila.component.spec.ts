/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpazilaComponent } from './upazila.component';

describe('UpazilaComponent', () => {
  let component: UpazilaComponent;
  let fixture: ComponentFixture<UpazilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpazilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpazilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
