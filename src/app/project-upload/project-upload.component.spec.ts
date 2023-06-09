import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUploadComponent } from './project-upload.component';

describe('ProjectUploadComponent', () => {
  let component: ProjectUploadComponent;
  let fixture: ComponentFixture<ProjectUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectUploadComponent]
    });
    fixture = TestBed.createComponent(ProjectUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
