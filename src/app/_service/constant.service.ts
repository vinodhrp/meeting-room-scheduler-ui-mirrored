import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }


  baseURI ='http://localhost:8080';

  refreshToken = 'refresh_token';
  userId = 'user_id';
  accessToken = 'access_token';
  fullName = 'full_name';
  reponseCode = '200';


  register = '/openapi/register';
  fetchUsers = '/userprofile/fetchusers';
  fetchSingleUser = '/userprofile/fetchuser';
  bookRoom = '/meetingroom/book';
  cancelRoom = '/meetingroom/cancel';
  searchRoom = '/meetingroom/search';

  fetchRooms = '/room/fetchrooms';

  token = '/oauth/token';

}
