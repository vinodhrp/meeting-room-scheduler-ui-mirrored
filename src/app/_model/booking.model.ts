import { Time } from '@angular/common';
 
export class Booking {
 
    roomId:number;
    usrEmpId:number;
    userName:string;
    bookingDate:Date;
    bookingStarTime:Time;
    bookingEndTime:Time;
    purpose:string;
}