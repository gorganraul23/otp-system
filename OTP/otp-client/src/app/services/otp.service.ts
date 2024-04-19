import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private http = inject(HttpClient);

  timeToExpire = signal<string>('30');

  generateOtp(email: string, expiryTime: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = JSON.stringify({ email: email, expiryTime: expiryTime});
    return this.http.post<string>(environments.apiUrl + environments.apiEndpoints.otp, requestBody, { headers });
  }

  verifyOtp(email: string, otpCode: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = JSON.stringify({ email: email, otpCode: otpCode.toString()});
    return this.http.post<string>(environments.apiUrl + environments.apiEndpoints.verify, requestBody, { headers })
  }

}
