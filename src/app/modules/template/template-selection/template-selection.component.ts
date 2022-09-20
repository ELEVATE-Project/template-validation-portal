import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-selection',
  templateUrl: './template-selection.component.html',
  styleUrls: ['./template-selection.component.scss']
})
export class TemplateSelectionComponent implements OnInit {


  selectedFile: any;
  fileInput: any;

  public downloadTemplates = [
    { id: 0, name: "Select Project Template" },
    { id: 1, name: "Select Observation Template" },
    { id: 2, name: "Select Survey Template" }
  ]

  public uploadTemplates = [
    "Excel File",
    "Google Share Link",
  ]

  public sortableElement: string = "Uploads";
  constructor() { }

  ngOnInit(): void {
  }

  setSortableElement($event: string) {
    this.sortableElement = $event;
  }


  templateDownload() {
    console.log("Downloading...!")
  }

  fileUpload(fileInput: HTMLInputElement) {
    fileInput.click()
  }

}
