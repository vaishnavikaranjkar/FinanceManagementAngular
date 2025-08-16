import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { FdData } from '../../models/fd-data';

@Component({
  selector: 'app-fd',
  standalone: true,
  imports: [MatExpansionModule, MatTableModule],
  templateUrl: './fd.component.html',
  styleUrl: './fd.component.scss'
})
export class FdComponent implements OnInit {
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
  fdDataUrl = 'assets/fd.json';

  constructor(private http: HttpClient) { }
  //convertDurationToDays
  ngOnInit() {
    this.getFdData();
  }

  getFdData(): void {
    this.http.get<FdData[]>(this.fdDataUrl).subscribe(data =>
      this.dataSource = data,
    );
    this.dataSource.sort((a, b) => {
      const dateA = new Date(a.maturityDate.split('/').reverse().join('-'));
      const dateB = new Date(b.maturityDate.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });
    this.dataSource.forEach(item => {
      item.interestAmount = (parseFloat(item.maturityAmount) - parseFloat(item.principalAmount)).toFixed(2);
    });
    console.log('FD Data:', this.dataSource);
  }
}
