import { Component, OnInit ,ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import {TableUtil} from './tableUtil'


type AOA = any[][];
@Component({
  selector: 'app-validation-result',
  templateUrl: './validation-result.component.html',
  styleUrls: ['./validation-result.component.scss'],
})
export class ValidationResultComponent implements OnInit {
 
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  data: MatTableDataSource<any> | undefined;
  columnNames: any;
  result:any;
  fileName: string = 'SheetJS.xlsx';

  public downloadResources = [
    { id: 0, name: 'Select Project Resource' },
    { id: 1, name: 'Select Observation Resource' },
    { id: 2, name: 'Select Survey Resource' },
  ];
  constructor() {}

  ngOnInit(): void {}

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */

   capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    this.readFile(target, reader).subscribe((output) => {
      this.result = output;
      this.columnNames = Object.keys(this.result[0]);
      this.data = new MatTableDataSource(this.result);
      this.data.paginator = this.paginator;
    });
  }

  readFile(target: DataTransfer, reader: FileReader): Observable<string> {
    const sub = new Subject<string>();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

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

  export(): void {
    const onlyNameAndSymbolArr: Partial<any>[] = this.result;
    TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, this.fileName);
  }
 

  
}



