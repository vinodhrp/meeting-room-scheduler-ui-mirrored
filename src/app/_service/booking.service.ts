import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Booking } from '../_model/booking.model';
import { ConstantService } from './constant.service';
import { RestResponse } from '../_model/rest-response.model';

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
      bookingStartTime: searchInfo.bookingStartTime,
      bookingEndTime: searchInfo.bookingEndTime
    };
    return this.http.post<Booking[]>(this.cons.baseURI + this.cons.searchRoom, search);
  }


  bookRoom(booking: Booking): Observable<HttpResponse<Booking>> {
    const book = {
      roomId: booking.roomId,
      usrEmpId: booking.usrEmpId,
      bookingDate: booking.bookingDate,
      bookingStartTime: booking.bookingStartTime,
      bookingEndTime: booking.bookingEndTime,
      purpose: booking.purpose
    };
    console.log(book.roomId,book.usrEmpId,book.bookingDate,book.bookingStarTime,book.bookingEndTime,book.purpose);
    return this.http.post<Booking>(this.cons.baseURI + '/meetingroom/bookroom', book, { observe: 'response' });


    console.log('Booking Values in Service : ' +book);
    return this.http.post<Booking>(this.cons.baseURI + this.cons.bookRoom, book, { observe: 'response' });
  }


  cancelBooking(bookId: number):Observable<RestResponse>{
    return this.http.get<RestResponse>(this.cons.baseURI + this.cons.cancelRoom +'/'+bookId);
  }





}