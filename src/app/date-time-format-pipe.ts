import { DatePipe } from "@angular/common";
import { PipeTransform } from '@angular/core';

export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
    transform(inputDate: any): any {
      var datePipe = new DatePipe("en-US");
      return datePipe.transform(inputDate, 'yyyy-MM-dd');
    }
    transform2(inputDate:any):any{
        var datePipe = new DatePipe("en-US");
      return datePipe.transform(inputDate, 'd/M/yyyy');
    }
  }