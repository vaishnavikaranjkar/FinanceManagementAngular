import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
import { BillsData } from '../../models/bills-data';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss',
})
export class BillsComponent implements OnInit {
  billsDataUrl = 'assets/bills.json';
  bills: any[] = [];
  mappedBills: Array<[string, BillsData[]]> = new Array<[string, BillsData[]]>();
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>(this.billsDataUrl).subscribe(data => {
      this.bills = data;
      this.mappedBills = Array.from(this.mapUserBills());
    });
  }

  mapUserBills(): Map<string, BillsData[]> {
    return this.bills.reduce((map, bill) => {
      if (!map.has(bill.user)) {
        map.set(bill.user, [bill]);
      } else {
        map.get(bill.user)!.push(bill);
      }
      return map;
    }, new Map<string, BillsData[]>());
  }
}
