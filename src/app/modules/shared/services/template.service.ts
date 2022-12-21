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

  getErrorExcelSheet(){
    let templatePath = "/opt/backend/template-validation-portal-service/apiServices/src/main/tmp/Program_Template_latest_Final_--_30_12_2021_(6)1671623565-011165.xlsx"
    const reqParam = {
      url: 'errDownload',
      headers:{
        "Authorization":localStorage.getItem("token")
      },
      data: {
        "request":{
          "templatePath": templatePath,
        }
        
      }
    }
    return this.dataService.get(reqParam);
  }
  validateTemplates(templatePath: any, userUploadedFileType: any) {
    let templateCode = (userUploadedFileType == "program Template") ? "1": "2";
    const reqParam = {
      url: 'validate',
      headers:{
        "Authorization":localStorage.getItem("token")
      },
      data: {
        request: {
          "templatePath": templatePath,
          "templateCode": templateCode
        }
      }
    }
    return this.dataService.post(reqParam);

  }
}
