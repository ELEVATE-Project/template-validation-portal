/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableCellErrorDialogsComponent } from './table-cell-error-dialogs.component';

describe('TableCellErrorDialogsComponent', () => {
  let component: TableCellErrorDialogsComponent;
  let fixture: ComponentFixture<TableCellErrorDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellErrorDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellErrorDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
