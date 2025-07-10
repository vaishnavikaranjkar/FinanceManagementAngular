import { Injectable } from '@angular/core';
import { EmiSchedule } from '../models/emi-schedule';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmiData } from '../models/emi-data';

@Injectable({
  providedIn: 'root'
})
export class EmiService {

  private emiScheduleUrl = 'assets/emi_schedule.json';
  private emiDataUrl = 'assets/emi_data.json';

  constructor(private http: HttpClient) { }

  getEmiSchedule() : Observable<EmiSchedule[]> {
    return this.http.get<EmiSchedule[]>(this.emiScheduleUrl);
  }

  getEmiData(): Observable<EmiData[]> {
    return this.http.get<EmiData[]>(this.emiDataUrl);
  }

}
