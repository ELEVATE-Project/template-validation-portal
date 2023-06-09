import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-upload',
  templateUrl: './project-upload.component.html',
  styleUrls: ['./project-upload.component.sass']
})
export class ProjectUploadComponent {
  projectUploadForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.projectUploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      projectId: ['', Validators.required],
      isSSOUser: ['', Validators.required],
      dikshaLoginId: ['', Validators.required],
      categories: ['', Validators.required],
      objective: ['', Validators.required],
      duration: ['', Validators.required],
      recommendedFor: ['', Validators.required],
      keywords: ['', Validators.required],
      learningResources1_name: [''],
      learningResources1_link: [''],
      learningResources2_name: [''],
      learningResources2_link: [''],
      learningResources3_name: [''],
      learningResources3_link: [''],
      hasCertificate: ['', Validators.required],
      projectLevelEvidence: ['', Validators.required],
      minNoOfEvidence: ['']
    });
  }

  onSubmit() {
    if (this.projectUploadForm.valid) {
      
      const projectData = this.projectUploadForm.value;
      console.log(projectData);
    } else {
      
      this.markFormGroupTouched(this.projectUploadForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
