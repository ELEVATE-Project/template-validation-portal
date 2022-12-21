import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-cell-error-dialogs',
  templateUrl: './table-cell-error-dialogs.component.html',
  styleUrls: ['./table-cell-error-dialogs.component.scss']
})
export class TableCellErrorDialogsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TableCellErrorDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.data.content = Array.isArray(this.data.content) ? this.data.content : [this.data.content]
  }

  copyToClipBoard() {
    navigator.clipboard.writeText(this.data.content.join(',')).then(() => {
      this.toastr.success('Error copied successfully.','Success')
      /* Resolved - text copied to clipboard successfully */
    },() => {
      console.error('Failed to copy');
      /* Rejected - text failed to copy to the clipboard */
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
