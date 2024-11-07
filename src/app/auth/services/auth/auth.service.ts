import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../../interfaces/auth-request';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth-response';
import { SignupRequest } from '../../interfaces/signup-request';
import { SignupResponse } from '../../interfaces/signup-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = environment.BASE_URL;


  constructor(private http: HttpClient) { }

  //login Rest point
  login(data: AuthRequest): Observable<AuthResponse> {


    return this.http
      .post<AuthResponse>(`${this.URL}auth/signin`, data);
  }

  //signup Rest point
  signup(data: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.URL}auth/signup`, data);
  }


}
