import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../shared/services/template.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { TableCellErrorDialogsComponent } from '../../shared/dialogs/table-cell-error-dialogs/table-cell-error-dialogs.component';

type AOA = any[][];
@Component({
  selector: 'app-validation-result',
  templateUrl: './validation-result.component.html',
  styleUrls: ['./validation-result.component.scss'],
})
export class ValidationResultComponent implements OnInit {

  highlight: boolean = false;
  data: MatTableDataSource<any> | undefined;
  columnNames: any;
  result: any;
  row: any;
  length: any;
  sheetarr: any;
  wsname: any;
  wbfile: any;
  advancedErrorList:Array<Object> = [];
  basicErrorsList:Array<Object> = [];
  rowErrorsList:Array<Object> = [];
  a: any;
  fileName: string = 'SheetJS.xlsx';
  errors: any
  selectedSheet: any;
  headers: any;
  isUserLogin: any = false;
  columnIdentifier:any;
  statusClass:any ='not-active';
state:any = true;

  constructor(private route: ActivatedRoute,private toastr: ToastrService,public dialog: MatDialog, private router: Router, private templateService: TemplateService, private authService: AuthenticationService,private _location: Location) { }


  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngOnInit(): void {

   this.errors = this.templateService.templateError
    this.onFileChange(this.templateService.templateFile)
    this.isUserLogin = this.authService.isUserLoggedIn();

  }

  copyToClipBoard(error1:any,error2:any) {
    navigator.clipboard.writeText(error1 ? error1 : '' +error2 ? error2 : '').then(() => {
      this.toastr.success('Error copied successfully.','Success')
      /* Resolved - text copied to clipboard successfully */
    },() => {
      console.error('Failed to copy');
      /* Rejected - text failed to copy to the clipboard */
    });
  }

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  onLogout() {
    this.authService.logoutAccount();
    this.isUserLogin = false;
    this.router.navigate(['/auth/login'])
    window.location.reload();
  }

  getOpenStatus(status?:boolean) {
    return status ? !status : false;
  }

  openDialog(error1:any,error2:any) {
    const dialogRef = this.dialog.open(TableCellErrorDialogsComponent, {
      data: {content:error1 ? error1 : '' +error2 ? error2 : ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onFileChange(evt: any) {
    if(!this.errors){
      this.router.navigate(['/template/template-selection'])
    }
    // const target: DataTransfer = <DataTransfer>evt.target;
    const target: DataTransfer = <DataTransfer>evt;
    const reader: FileReader = new FileReader();

    this.readFile(target, reader).subscribe((output) => { });

  }

  getErrorsList(column: any,index:number) {
    let item
    if(this.advancedErrorList.length) {
      item = this.advancedErrorList.map((element:any) => {
        if(element.rowNumber == (index) && this.columnIdentifier[column] == element.columnName) {
          return element.errMessage;
        }
        else if(Array.isArray(element.rowNumber) && element.rowNumber.includes(index) && this.columnIdentifier[column] == element.columnName) {
          return element.errMessage;
        }
      }).filter((element) => element)
    }
    return item
  }

  getBasicErrors(column: any,index:number) {
    let item:any = [];
    if(this.basicErrorsList.length) {
      item = this.basicErrorsList.map((element:any) => {
        if(element.rowNumber == (index) && this.columnIdentifier[column] == element.columnName) {
          return element.errMessage;
        }
        else if(Array.isArray(element.rowNumber) && element.rowNumber.includes(index) && this.columnIdentifier[column] == element.columnName) {
          return element.errMessage;
        }
      }).filter((element) => element)
    }
    if(this.rowErrorsList.length > 0) {
      this.rowErrorsList.forEach((element:any) => {
        if(Array.isArray(element.rowNumber) && element.rowNumber.includes(index)) {
          item.push(element.errMessage)
        }
        else if (element.rowNumber == index) {
          item.push(element.errMessage)
        }
      })
    }
    return item
  }

  isContainsError(column: any, ele: any, row:any,index:number) {
    if(this.rowErrorsList.length > 0) {
      let item =this.rowErrorsList.find((element:any) => {
        if(Array.isArray(element.rowNumber) && element.rowNumber.includes(index)) {
          return element
        }
        else if (element.rowNumber == index) {
          return element
        }
      })
      if(item) {
        return true;
      }
    }
    if(this.advancedErrorList.length || this.basicErrorsList.length) {
      const advancedErrors:any = this.advancedErrorList.find((element:any) => (Array.isArray(element.rowNumber) ? element.rowNumber.includes(index) : element.rowNumber == index) && this.columnIdentifier[column] == element.columnName)
      const basicErrors:any = this.basicErrorsList.find((element:any) => (Array.isArray(element.rowNumber) ? element.rowNumber.includes(index) : element.rowNumber == index) && this.columnIdentifier[column] == element.columnName)
      return advancedErrors || basicErrors ? true : false;
    }
    else {
      return false;
    }
  }


  readFile(target: DataTransfer, reader: FileReader): Observable<string> {
    const sub = new Subject<string>();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      this.wbfile = wb;
      this.sheetarr = wb.SheetNames;
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      const data: any = XLSX.utils.sheet_to_json(ws);
      sub.next(data);
      sub.complete();
      this.onClickSheetName(wb.SheetNames[1])

    };

    reader.readAsBinaryString(target.files[0]);

    return sub.asObservable();
  }
  isSlectedSheet(s: any){
    if(s==this.selectedSheet){
      return true;
    }else{
      return false
    }


  }
  onClickSheetName(s: any) {

    const wsname: string = s;
    const ws: XLSX.WorkSheet = this.wbfile.Sheets[wsname];
    const data: any = XLSX.utils.sheet_to_json(ws);
    this.headers = data[0]
    this.columnIdentifier = data[0]

    this.columnNames = Object.keys(data[0]);
    this.data = new MatTableDataSource(data);
    // this.data.paginator = this.paginator;
    this.selectedSheet = s;

   this.advancedErrorList = this.errors.advancedErrors.data.filter((item:any) => item.sheetName == this.selectedSheet)
   this.basicErrorsList = this.errors.basicErrors.data.filter((item:any) => item.sheetName == this.selectedSheet);
   this.rowErrorsList = [...this.basicErrorsList.filter((element:any) => element.columnName.length == 0),...this.advancedErrorList.filter((element:any) => element.columnName.length == 0)]
  }
  firstRow(index:any){
    if(index == 0){
      return true
    }else{
      return false
    }
  }
  export(): void {
    XLSX.writeFile(this.wbfile, `$file.xlsx`);
  }
  errorExcelDownload(){
    window.open(this.errors.errFileLink,'_blank');
  }

  goBack() {
    this._location.back();
  }


}



