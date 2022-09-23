import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-selection',
  templateUrl: './template-selection.component.html',
  styleUrls: ['./template-selection.component.scss'],
})
export class TemplateSelectionComponent implements OnInit {
  selectedFile: any;
  fileInput: any;
  fileName = '';

  public downloadTemplates = [
    { id: 0, name: 'Select Project Template' },
    { id: 1, name: 'Select Observation Template' },
    { id: 2, name: 'Select Survey Template' },
  ];

  public uploadTemplates = ['Excel File', 'Google Share Link'];

  public sortableElement: string = 'Uploads';
  constructor() {}

  ngOnInit(): void {}

  setSortableElement($event: string) {
    this.sortableElement = $event;
  }

  templateDownload() {
    console.log('Downloading...!');
  }

  fileUpload(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  getFileDetails(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.fileName = event.target.files[i].name;
      // var type = event.target.files[i].type;
      // var size = event.target.files[i].size;
      // var modifiedDate = event.target.files[i].lastModifiedDate;

      // console.log ('Name: ' + name + "\n" +
      //   'Type: ' + type + "\n" +
      //   'Last-Modified-Date: ' + modifiedDate + "\n" +
      //   'Size: ' + Math.round(size / 1024) + " KB");
    }
  }
}
