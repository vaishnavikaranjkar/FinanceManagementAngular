import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { InsuranceData } from '../../models/insurance-data';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-elements',
  templateUrl: '../../models/dialog.html',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DialogElement {}

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [MatCardModule, MatButtonModule ],
  templateUrl: './insurance.component.html',
  styleUrl: './insurance.component.scss'
})
export class InsuranceComponent implements OnInit {
  insuranceDataUrl = 'assets/insurance.json';
  insuranceData: InsuranceData[] = [];
  readonly dialog = inject(MatDialog);


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<InsuranceData[]>(this.insuranceDataUrl).subscribe(
      (data) => {
        this.insuranceData = data;
        console.log('Insurance data loaded:', this.insuranceData);
      });
  }

  openDetailsPopUp() {
    this.dialog.open(DialogElement);
  }
  
}
