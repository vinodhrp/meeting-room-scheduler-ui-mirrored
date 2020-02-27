import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../_model/booking.model';
 
@Injectable({
  providedIn: 'root'
})
export class BookingService {
 
  jsonURL:string='assets/sampleList.json';
  constructor(private http:HttpClient) { }
 
  getAllLists():Observable<any>{
    return this.http.get<Booking>(this.jsonURL);
  }
}