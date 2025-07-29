import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:3000/api/email/send';

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, body: string) {
    return this.http.post(this.apiUrl, { to, subject, body });
  }

  
}
