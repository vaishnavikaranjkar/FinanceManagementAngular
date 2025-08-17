import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ErdData } from '../../models/erd-data';

@Component({
  selector: 'app-erd',
  standalone: true,
  imports: [MatExpansionModule, MatTableModule],
  templateUrl: './erd.component.html',
  styleUrl: './erd.component.scss'
})
export class ErdComponent {
dataSource: any[] = [];
  displayedColumns: string[] = [
    'depositDate',
    'maturityDate',
    'roi',
    'duration',
    'principalAmount',
    'maturityAmount',
    'interestAmount'
  ];
  erdDataUrl = 'assets/erd.json';

  constructor(private http: HttpClient) { }
  //convertDurationToDays
  ngOnInit() {
    this.getErdData();
  }

  getErdData(): void {
    this.http.get<ErdData[]>(this.erdDataUrl).subscribe(data => {
      this.dataSource = data,
      this.dataSource.sort((a, b) => {
        const dateA = new Date(a.maturityDate.split('/').reverse().join('-'));
        const dateB = new Date(b.maturityDate.split('/').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });
      this.dataSource.forEach(item => {
        item.interestAmount = (parseFloat(item.maturityAmount) - parseFloat(item.principalAmount)).toFixed(2);
      });
    });
  }
}
