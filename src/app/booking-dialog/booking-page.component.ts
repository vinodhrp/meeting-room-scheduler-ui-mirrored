import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatepickerDialogueComponent } from '../datepicker-dialogue/datepicker-dialogue.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSlideToggleChange, MatRadioChange, MatRadioButton } from '@angular/material';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {

    form: FormGroup;
    description:string;
    checked = false;
    disabled = false;
    dates: any = [];
    dateString: string = ''
    isrequired: boolean = false;
    repeatType : any;

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog, 
        public datePipe: DatePipe,
        private dialogRef: MatDialogRef<BookingPageComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.description;
    }

    ngOnInit() {
        this.form = this.fb.group({
            description: [this.description, []],
          
        });
    }

    openDatepicker(): void {
        const dialogRef = this.dialog.open(DatepickerDialogueComponent, {
          width: '400px'
        });
    
        this.dateString = '';
        dialogRef.afterClosed().subscribe(data => {
          
          this.dates = [];
          if (data && data.hasDatePicked) {
            if (data.type === 'single' || data.type === 'multi') {
              this.dates = data.dates;
            }
            else {
              this.dates = data.dates.days;
            }
            this.dates.forEach((date) => {
              this.dateString = this.datePipe.transform(date, 'd MMM y') +', '+this.dateString;
            });
          }
        });
      };

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    onChange(mrChange: MatRadioChange) {
        console.log(mrChange.value);
        this.repeatType = mrChange.value;
        let mrButton: MatRadioButton = mrChange.source;
        console.log(mrButton.name);
        console.log(mrButton.checked);
        console.log(mrButton.inputId);
    
        if (mrButton.value == "Custom") {
          this.isrequired = true;
        } else {
        this.isrequired = false;
        }
     } 
    
}

    