import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  userEmail = signal<string>('');

  login(email: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = JSON.stringify({ email: email, password: password });
    return this.http.post<string>(environments.apiUrl + environments.apiEndpoints.login, requestBody, { headers });
  }

}
