import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { TemplateService } from '../../shared/services/template.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-template-success',
  templateUrl: './template-success.component.html',
  styleUrls: ['./template-success.component.scss']
})
export class TemplateSuccessComponent implements OnInit {
  isUserLogin: any = false;
  wbfile: any;

  constructor(private authService: AuthenticationService, private router: Router, private templateService: TemplateService) { }

  ngOnInit(): void {
    this.isUserLogin = this.authService.isUserLoggedIn();
    if(!this.templateService.templateFile){
      this.router.navigate(['/template/template-selection'])
    }
    this.onFileChange(this.templateService.templateFile)
    
  }
  onLogout() {
    this.authService.logoutAccount();
    this.isUserLogin = false;
    this.router.navigate(['/auth/login'])
  }
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt;
    const reader: FileReader = new FileReader();
    this.readFile(target, reader).subscribe((output) => { }); 
  }
  readFile(target: DataTransfer, reader: FileReader): Observable<string> {
    const sub = new Subject<string>();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      this.wbfile = wb;
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      const data: any = XLSX.utils.sheet_to_json(ws);
      sub.next(data);
      sub.complete();
    };

    reader.readAsBinaryString(target.files[0]);
    
    return sub.asObservable();
  }
  export(): void {
    XLSX.writeFile(this.wbfile, `$file.xlsx`);
  }
 
}
