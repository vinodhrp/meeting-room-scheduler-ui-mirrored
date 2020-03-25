import { Component, OnInit } from '@angular/core';
import { AAAPickerModes } from 'ngx-aaa-datepicker/lib/aaa-picker-modes.interface';
import { NgxAaaDatepickerComponent } from 'ngx-aaa-datepicker';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-datepicker-dialogue',
  templateUrl: './datepicker-dialogue.component.html',
  styleUrls: ['./datepicker-dialogue.component.scss']
})
export class DatepickerDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NgxAaaDatepickerComponent>) { }

  ngOnInit() {
  }

  pickerModes: AAAPickerModes = {
    single: true, // disable/enable single date picker mode
    multi: true, // disable/enable multiple date picker mode
    range: true // disable/enable range date picker mode
    
  }
  getDate(event) {
    this.dialogRef.close(event);
  }
  
}
