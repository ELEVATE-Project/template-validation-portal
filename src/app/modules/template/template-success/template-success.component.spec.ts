import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSuccessComponent } from './template-success.component';

describe('TemplateSuccessComponent', () => {
  let component: TemplateSuccessComponent;
  let fixture: ComponentFixture<TemplateSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
