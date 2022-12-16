import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  [x: string]: any;
  templateFile:any;
  templateError:any;
  constructor(private dataService: DataService) { }

  selectTemplates() {
    const reqParam = {
      url: 'download/sampleTemplate',

    }
    return this.dataService.get(reqParam);
  }

  uploadTemplates(file: any) {

    const formData = new FormData();
    formData.append('file', file, file.name);
    const reqParam = {
      url: 'upload',
      headers:{
        "Authorization":localStorage.getItem("token")
      },
      data: formData
    }
    
    return this.dataService.post(reqParam);
  }

  validateTemplates(templatePath: any, userUploadedFileType: any) {
    let templateCode = (userUploadedFileType == "program Template") ? "1": "2";
    const reqParam = {
      url: 'validate',
      headers:{
        "Authorization":localStorage.getItem("token")
      },
      data: {
        "templatePath": templatePath,
        "templateCode": templateCode
      }
    }
    return this.dataService.post(reqParam);

  }
}
