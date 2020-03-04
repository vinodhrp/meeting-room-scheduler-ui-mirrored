import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Booking } from '../_model/booking.model';
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  jsonURL: string = 'assets/sampleList.json';
  constructor(private http: HttpClient,
    private cons: ConstantService) { }


  updateResults = new Subject<Booking[]>();


  currentMessage = this.updateResults.asObservable();



  changeMessage(message: Booking[]) {
    console.log(message);
    this.updateResults.next(message)
  }

  getAllLists(searchInfo: Booking): Observable<Booking[]> {
    const search = {
      roomId: searchInfo.roomId,
      bookingDate: searchInfo.bookingDate,
      bookingStartTime: searchInfo.bookingStarTime,
      bookingEndTime: searchInfo.bookingEndTime
    };
    return this.http.post<Booking[]>(this.cons.baseURI + '/meetingroom/searchroom', search);
  }


  bookRoom(booking: Booking): Observable<HttpResponse<Booking>> {
    const book = {
      roomId: booking.roomId,
      usrEmpId: booking.usrEmpId,
      bookingDate: booking.bookingDate,
      bookingStarTime: booking.bookingStarTime,
      bookingEndTime: booking.bookingEndTime,
      purpose: booking.purpose
    };
    console.log(book.roomId,book.usrEmpId,book.bookingDate,book.bookingStarTime,book.bookingEndTime,book.purpose);
    return this.http.post<Booking>(this.cons.baseURI + '/meetingroom/bookroom', book, { observe: 'response' });
  }





}