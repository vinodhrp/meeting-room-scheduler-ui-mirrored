import { Time } from '@angular/common';
 
export class Booking {
 
    roomId:number;
    usrEmpId:number;
    userName:String;
    bookingDate:String;
    bookingStartTime:String;
    bookingEndTime:String;
    purpose:String;
    
    //constructor(){}

    bookingId?:number;
    roomName?:string;

    constructor(roomId: number, usrEmpId: number,userName: String,bookingDate: String,bookingStartTime: String,bookingEndTime: String,purpose : String) {
        this.roomId = roomId;
        this.usrEmpId = usrEmpId;
        this.userName= userName;
        this.bookingDate =  bookingDate;
        this.bookingStartTime = bookingStartTime;
        this.bookingEndTime = bookingEndTime;
        this.purpose = purpose;
     }
}