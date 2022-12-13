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
  a: any;
  fileName: string = 'SheetJS.xlsx';
  errors:any
  selectedSheet: any;
  headers:any;
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


  isSelected(column: any, ele: any, row:any) {
// console.log(column)
// console.log(ele)
// console.log(row)
this.dummyData.forEach((data:any) => {
  // console.log(data)
  if(data.columnName == column ){
  
    if(ele ==data.data ){
      
      // console.log(data.rowNumber)
      // console.log(row.__rowNum__)
      if( row.__rowNum__ == (data.rowNumber)){
        console.log("yes")
        return true;
      }
    }
   
    
  }


return false
});
    // let index = column * this.length + row ;
    //  return this.selection.indexOf(index) >= 0;

// console.log(this.errors.advancedErrors.data)
// console.log(this.errors.basicErrors.data)


// this.errors.advancedErrors.data.forEach((error:any) => {
//   console.log(error)
//   if(error.sheetName == this.selectedSheet){
//     this.a = this.data?.data[1]
//   }
// }); 
    // if (ele == this.a && column == error.column) {
    //   return true;
    // } else {
    //   return false;
    // }

    // console.log(this.errorsDummy.result.advancedErrors.data)
    // console.log(this.errorsDummy.result.basicErrors.data)
   
//     this.errorsDummy.result.advancedErrors.data.forEach((error:any) => {
//   if(error.sheetName == this.selectedSheet){
//         for(let key in  this.headers) {
          
//           if(error.columnName == this.headers[key]){
//             if(column == key){
    
//              if(error.rowNumber.length > 1){
//               console.log(error.rowNumber)
//               error.rowNumber.forEach((rowNum:any) => {
//                 if((rowNum) == row.__rowNum__){
//                   console.log(row.__rowNum__)
//                   console.log("true...........")
//                   return true;
//                 }
//                 return false
//               });
             
//              }else{
//               if((error.rowNumber) == row.__rowNum__){
//                 console.log("true...........")
//                 return true;
//               }
            
//              }
             
              
//             }
//           }
          
//           }

//           return false;
      
//    }else{
//     return false;
//    }
// }); 
// this.errorsDummy.result.basicErrors.data.forEach((error:any) => {
//   if(error.sheetName == this.selectedSheet){
//         for(let key in  this.headers) {
//           if(error.columnName == this.headers[key]){
//             if(column == key){
//              if(error.rowNumber.length > 1){
//               error.rowNumber.forEach((rowNum:any) => {
//                 if((rowNum+2) == row.__rowNum__){
//                   console.log("true...........")
//                   return true;
//                 }
//                 return false
//               });
             
//              }else{
//               if((error.rowNumber+2) == row.__rowNum__){
//                 console.log("true...........")
//                 return true;
//               }
            
//              }
             
              
//             }
//           }
          
//           }

//           return false;
      
//    }else{
//     return false;
//    }
// }); 

   

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
    this.columnNames = Object.keys(data[0]);
    this.data = new MatTableDataSource(data);
    this.data.paginator = this.paginator;
    // if (s == "Sheet1")
    //   this.a = this.data.data[2].Name
    this.selectedSheet = s;
  }

  export(): void {
    // const onlyNameAndSymbolArr: Partial<any>[] = this.wbfile;
    // TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, this.fileName);

    XLSX.writeFile(this.wbfile, `$file.xlsx`);
  }



}



