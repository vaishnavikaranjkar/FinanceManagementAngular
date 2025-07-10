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
  }
  

   sendEmail() {
    const recipient = 'karanjkarv4@gmail.com'; // get dynamically if needed
    const subject = 'EMI Schedule';
    const body = 'Here is your EMI schedule!';
    console.log('Sending email to:', recipient, 'with subject:', subject, 'and body:', body);

    this.emailService.sendEmail(recipient, subject, body).subscribe({
      next: response => console.log('Email sent:', response),
      error: error => console.error('Error sending email:', error),
    });
  }

}
