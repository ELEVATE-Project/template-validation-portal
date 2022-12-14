import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../shared/services/template.service';
import { Router , NavigationExtras} from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-template-selection',
  templateUrl: './template-selection.component.html',
  styleUrls: ['./template-selection.component.scss'],
})
export class TemplateSelectionComponent implements OnInit {
  selectedFile: any;
  fileInput: any;
  fileName = '';
  wbfile: any;
  userSelectedFile: any;
  userUploadedFileType: any;
  public downloadTemplates: any = [

  ];
  uploadTemplates: any = [];
  isUserLogin:any = false;
  public sortableElement: string = 'Uploads';
  constructor(private templateService: TemplateService,private router: Router, private authService:AuthenticationService) { }

  ngOnInit(): void {
    history.pushState(null, '')
    this.templateService.selectTemplates()
      .subscribe((resp: any) => {
        resp.result.templateLinks.forEach((data: any) => {
          let templateName: any = (data.templateName.split(/(?=[A-Z])/)).join(" ")
          let template: any = { "name": templateName, "templateLink": data.templateLink }
          this.uploadTemplates.push(templateName)
          this.downloadTemplates.push(template)
        });
      }, (error: any) => {
      }) 
      this.isUserLogin = this.authService.isUserLoggedIn();  
  }
  onCickSelectedTemplate(selectedTemplate: any) {
    this.selectedFile = selectedTemplate;
  }
  setSortableElement($event: string) {
    this.sortableElement = $event;
  }
 
  templateDownload() {
    const url = this.selectedFile.templateLink;
    let capturedId = url.match(/\/d\/(.+)\//);
    window.open(`https://docs.google.com/spreadsheets/d/${capturedId[1]}/export?format=xlsx`)
  }
  templateUpload() {
    if (this.userSelectedFile) {
      this.templateService.uploadTemplates(this.userSelectedFile).subscribe((event: any) => {
        this.templateService.validateTemplates(event.result.templatePath, this.userUploadedFileType).subscribe((data) => {
          
          const navigationExtra:NavigationExtras = {
            queryParams:{
              result:JSON.stringify(data.result)
            }    
          }
      this.router.navigate(['/template/validation-result'],navigationExtra)

        })
      });
    }
  }
  onChange(event: any) {
    this.templateService.templateFile=event.target;
    this.userSelectedFile = event.target.files[0];
  }
  fileUpload(fileInput: HTMLInputElement, userUploadedFile: any) {
    fileInput.click();
    this.userUploadedFileType = userUploadedFile
  }
  onLogout(){
    this.authService.logoutAccount();
    this.router.navigate(['/auth/login'])
  }
  getFileDetails(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.fileName = event.target.files[i].name;
    }
  }
}


