/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewImmigrantComponent } from './new-immigrant.component';

describe('NewImmigrantComponent', () => {
  let component: NewImmigrantComponent;
  let fixture: ComponentFixture<NewImmigrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewImmigrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewImmigrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
