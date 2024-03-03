import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  title: string = "Are you really sure";
  content: string = "This item will be deleted permanently";
  delete: string = "delete";
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

}
