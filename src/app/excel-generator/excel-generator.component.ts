import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-generator',
  templateUrl: './excel-generator.component.html',
  styleUrls: ['./excel-generator.component.sass']
})
export class ExcelGeneratorComponent {
  generateExcelTemplate() {
   
    const data = [
      ['Name of resources in program', 'Type of resources', 'Resource Link', 'Resource Status', 'Target role at the resource level', 'Targeted subrole at resource level', 'Start date of resource', 'End date of resource'],
      ['Obs Form for All Question type', 'Observation without rubrics', 'https://docs.google.com/spreadsheets/d/1uErekrCkuOXMdIvXsCSOr7YiBk4HcS4iJrh0tdALlsw/edit#gid=2134498639', 'Existing', 'HM,DEO', '', '30-08-2021', '30-08-2022']
    ];

   
    const workbook = XLSX.utils.book_new();

   
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

   
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

   
    this.saveExcelFile(excelBuffer, 'template.xlsx');
  }

  saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = fileName;

   
    link.click();

    
    window.URL.revokeObjectURL(link.href);
    link.remove();
  }
}

