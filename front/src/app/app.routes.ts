import { Routes } from '@angular/router';
import { authUserGuard } from './guards/authUser.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login-user', pathMatch: 'full' },
    //lazy loading
    {title:'Connexion utilisateur', path: 'login-user', loadComponent: () => import('./views/pages/login-user/login-user.component').then(c => c.LoginUserComponent) },
    {title:'Inscription utilisateur', path: 'registration-user', loadComponent: () => import('./views/pages/registration-user/registration-user.component').then(c => c.RegistrationUserComponent) },
    {title:'Connexion professionnel de santé', path: 'login-health-professional', loadComponent: () => import('./views/pages/login-health-professional/login-health-professional.component').then(c => c.LoginHealthProfessionalComponent) },
    {title:'Accueil', path: 'home', loadComponent: () => import('./views/pages/home/home.component').then(c => c.HomeComponent) },
    {title:'Liste des professionnels de santé', path: 'list-health-professional', loadComponent: () => import('./views/pages/list-health-professional/list-health-professional.component').then(c => c.ListHealthProfessionalComponent) },
];