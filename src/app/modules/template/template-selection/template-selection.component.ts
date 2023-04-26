import { Component, HostListener, OnInit } from '@angular/core';
import { TemplateService } from '../../shared/services/template.service';
import { Router , NavigationExtras} from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

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
  loader:any = false;
  userSelectedFile: any;
  userUploadedFileType: any;
  templateLinks:any;
  public downloadTemplates: any = [

  ];
  uploadTemplates: any = [];
  isUserLogin:any = false;
  public sortableElement: string = 'Uploads';
  constructor(private templateService: TemplateService,private router: Router, private authService:AuthenticationService, private toaster:ToastrService) { }
  @HostListener('window:popstate', ['$event'])
  onPopState(event:any) {
    window.location.hash = "dontgoback";
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(['/template/template-selection']);
  }

  ngOnInit(): void {

    history.pushState(null,'', window.location.href);
    this.templateService.selectTemplates()
      .subscribe((resp: any) => {

        this.templateLinks = resp.result.templateLinks
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
    this.loader = true
    if (this.userSelectedFile) {
      this.templateService.uploadTemplates(this.userSelectedFile).subscribe((event: any) => {
        this.templateService.validateTemplates(event.result.templatePath, this.userUploadedFileType, this.templateLinks).subscribe((data) => {

          this.loader = false
          if(!data.result.advancedErrors && !data.result.basicErrors){
            this.router.navigate(['/template/template-success'])
          }else{

            this.templateService.templateError=data.result;
            this.router.navigate(['/template/validation-result'])
          }


        }, (error: any) => {
        this.loader = false; })
      });
    }
  }
  onChange(event: any) {
    this.templateService.templateFile=event.target;
    this.userSelectedFile = event.target.files[0];
  }
  fileUpload(fileInput: HTMLInputElement, userUploadedFile: any) {
    this.fileName = ""
    fileInput.click();
    this.userUploadedFileType = userUploadedFile
  }
  onLogout(){
    this.authService.logoutAccount();
    this.router.navigate(['/auth/login'])
  }
  getFileDetails(event: any) {
    debugger;
    if(event.target.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      for (var i = 0; i < event.target.files.length; i++) {
        this.fileName = event.target.files[i].name;
      }
    }
    else {
      this.toaster.error('Please upload valid file format','Validation')
    }

  }
}


