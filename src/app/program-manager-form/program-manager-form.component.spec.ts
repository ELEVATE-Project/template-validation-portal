import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramManagerFormComponent } from './program-manager-form.component';

describe('ProgramManagerFormComponent', () => {
  let component: ProgramManagerFormComponent;
  let fixture: ComponentFixture<ProgramManagerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramManagerFormComponent]
    });
    fixture = TestBed.createComponent(ProgramManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
