import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../shared/services/template.service';

type AOA = any[][];
@Component({
  selector: 'app-validation-result',
  templateUrl: './validation-result.component.html',
  styleUrls: ['./validation-result.component.scss'],
})
export class ValidationResultComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  highlight: boolean = false;
  data: MatTableDataSource<any> | undefined;
  columnNames: any;
  result: any;
  row: any;
  length: any;
  sheetarr: any;
  wsname: any;
  wbfile: any;
  errorIndex:number = -1;
  basicErrorsList:Array<Object> = [];
  a: any;
  fileName: string = 'SheetJS.xlsx';
  errors:any
  selectedSheet: any;
  headers:any;
  columnIdentifier:any;
  dummyData:any = [{"columnName":"Enter the role here. (The roles should already be given on platform)","data":"Program Manager","rowNumber":"2"},{"columnName":"Enter the role here. (The roles should already be given on platform)","data":"Program Manager","rowNumber":"3"}]



  constructor(private route: ActivatedRoute, private templateService: TemplateService) { }



  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.errors=JSON.parse(params.result)
    })
    console.log(this.errors);
    this.onFileChange(this.templateService.templateFile)
  }

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  onFileChange(evt: any) {
    // const target: DataTransfer = <DataTransfer>evt.target;
    const target: DataTransfer = <DataTransfer>evt;
    const reader: FileReader = new FileReader();

    this.readFile(target, reader).subscribe((output) => { });
  }


  isBasicError(column: any, ele: any, row:any,index:number) {
    if(this.basicErrorsList.length) {
      return (this.basicErrorsList.find((element:any) => element.rowNumber == (index+(this.paginator.pageIndex > 0 ? this.paginator.pageIndex*this.paginator.pageSize : 0)) && this.columnIdentifier[column] == element.columnName) ? true : false)
    }
    else {
      return false;
    }
  }

  getErrorsList(column: any,index:number) {

    if(this.errorIndex >= 0 && this.errors.advancedErrors.data[this.errorIndex].rowNumber.includes(index+(this.paginator.pageIndex > 0 ? this.paginator.pageIndex*this.paginator.pageSize : 0)) && this.errors.advancedErrors.data[this.errorIndex].columnName == this.columnIdentifier[column]) {
      return this.errors.advancedErrors.data[this.errorIndex].errMessage
    }

  }

  getBasicErrors(column: any,index:number) {
    let item
    if(this.basicErrorsList.length) {
      item = this.basicErrorsList.map((element:any) => {
        if(element.rowNumber == (index+(this.paginator.pageIndex > 0 ? this.paginator.pageIndex*this.paginator.pageSize : 0)) && this.columnIdentifier[column] == element.columnName) {
          return element.errMessage;
        }
      }).filter((element) => element)
    }
    return item
  }
  isAdvancedError(column: any, ele: any, row:any,index:number) {
    // console.log(index,this.paginator.page,this.paginator.pageIndex,this.paginator.pageSize,this.paginator.pageSizeOptions)
    if(this.errorIndex >= 0) {
      return this.errors.advancedErrors.data[this.errorIndex].rowNumber.includes(index+(this.paginator.pageIndex > 0 ? this.paginator.pageIndex*this.paginator.pageSize : 0)) && this.errors.advancedErrors.data[this.errorIndex].columnName == this.columnIdentifier[column];
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

    };

    reader.readAsBinaryString(target.files[0]);
    return sub.asObservable();
  }

  onClickSheetName(s: any) {
    const wsname: string = s;
    const ws: XLSX.WorkSheet = this.wbfile.Sheets[wsname];
    const data: any = XLSX.utils.sheet_to_json(ws);
    this.headers = data[0]
    this.columnIdentifier = data[0]
    console.log(this.columnIdentifier);
    this.columnNames = Object.keys(data[0]);
    this.data = new MatTableDataSource(data);
    this.data.paginator = this.paginator;
    // if (s == "Sheet1")
    //   this.a = this.data.data[2].Name
    this.selectedSheet = s;

   this.errorIndex = this.errors.advancedErrors.data.findIndex((item:any) => item.sheetName == this.selectedSheet)
   this.basicErrorsList = this.errors.basicErrors.data.filter((item:any) => item.sheetName == this.selectedSheet);
   console.log(this.basicErrorsList);

    // console.log(this.errorIndex);
  }

  export(): void {
    // const onlyNameAndSymbolArr: Partial<any>[] = this.wbfile;
    // TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, this.fileName);

    XLSX.writeFile(this.wbfile, `$file.xlsx`);
  }



}



