import { Component, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { EmiSchedule } from '../../models/emi-schedule';
import { EmiService } from '../../services/emi.service';
import { MatTableModule } from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { EmiData } from '../../models/emi-data';
import { EmailService } from '../../services/email.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-emi',
  standalone: true,
  imports: [
    MatTableModule,
    MatExpansionModule,
    MatListModule,
  ],
  templateUrl: './emi.component.html',
  styleUrl: './emi.component.scss'
})
export class EmiComponent {

  dataSource: EmiSchedule[] = [];
  displayedColumns: string[] = ['Instl', 'DueDate', 'ChequeNum', 'InstlAmt', 'Principal', 'Interest', 'OutstandingPrincipal'];
  readonly panelOpenState = signal(false);
  items: { key: string; value: EmiData; }[] = [];
  
  constructor(private emiService: EmiService, private emailService: EmailService, private http: HttpClient) { }

  ngOnInit() {
    this.emiService.getEmiSchedule().subscribe({
      next: data => this.dataSource = data,
      error: err => console.error('Failed to fetch EMI data:', err)
    });

    this.emiService.getEmiData().subscribe({
      next: data => {
      this.items = Object.entries(data).map(([key, value]) => ({ key, value }));
      },
      error: err => console.error('Failed to fetch EMI data:', err)
    });
    this.checkDueDateAndNotify();
    this.checkDueDates();
  }
  
  checkDueDates(): void {
    const today = new Date().toLocaleDateString('en-GB');
    this.emiService.getEmiSchedule().subscribe({
      next: data => {
        data.forEach(item => {
          if (item.DueDate === today) { 
            this.sendDueEmail(item);
          }
        });
      },
      error: err => console.error('Failed to load EMI schedule:', err)
    });
  }

  checkDueDateAndNotify() {
  const today = new Date().toLocaleDateString('en-GB'); // e.g. "29/07/2025"
  
  this.http.get<EmiSchedule[]>('assets/emi_schedule.json').subscribe(data => {
    data.forEach(item => {
      if (item.DueDate === today) {
        this.http.post('http://localhost:3000/api/wa/send-emi-wa-notif',{}) // optional data
          .subscribe({
            next: res => console.log('WhatsApp sent'),
            error: err => console.error('WhatsApp failed', err)
          });
      }
    });
  });
}


  sendDueEmail(item: any): void {
    const to = 'karanjkarv4@gmail.com';
    const subject = `EMI Due Today: Installment ${item.Instl}`;
    const body = `Your EMI of ₹${item.Amount} is due today (${item.DueDate}).`;

    this.emailService.sendEmail(to, subject, body).subscribe({
      next: () => console.log('Email sent on date:', item.DueDate),
      error: err => console.error('Email failed:', err)
    });
  }
  // um this is for button click
   sendEmail() {
    const recipient = 'karanjkarv4@gmail.com'; 
    const subject = 'EMI Schedule';
    const body = 'Here is your EMI schedule!';
    console.log('Sending email to:', recipient, 'with subject:', subject, 'and body:', body);

    this.emailService.sendEmail(recipient, subject, body).subscribe({
      next: response => console.log('Email sent:', response),
      error: error => console.error('Error sending email:', error),
    });
  }

}
