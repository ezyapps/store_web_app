/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MouzaComponent } from './mouza.component';

describe('MouzaComponent', () => {
  let component: MouzaComponent;
  let fixture: ComponentFixture<MouzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
