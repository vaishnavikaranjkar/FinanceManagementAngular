import { Routes } from '@angular/router';
import { EmiComponent } from './components/emi/emi.component';
import { HomeComponent } from './components/home/home.component';
import { FdComponent } from './components/fd/fd.component';
import { ErdComponent } from './components/erd/erd.component';
import { GoldComponent } from './components/gold/gold.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'emi', component: EmiComponent },           
    { path: 'fd', component: FdComponent },
    { path: 'erd', component: ErdComponent }, 
    { path: 'gold', component: GoldComponent}
];

