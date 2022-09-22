import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-report',
  templateUrl: './template-report.component.html',
  styleUrls: ['./template-report.component.scss'],
})
export class TemplateReportComponent implements OnInit {
  report_request = 6;
  report_success = 10;
  report_failed = 8;
  constructor() {}

  ngOnInit(): void {}
}
