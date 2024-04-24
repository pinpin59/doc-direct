import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    //lazy loading
    { path: 'login', loadComponent: () => import('./views/pages/login/login.component').then(c => c.LoginComponent) }
];