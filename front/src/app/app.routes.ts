import { Routes } from '@angular/router';
import { authUserGuard } from './guards/authUser.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login-user', pathMatch: 'full' },
    //lazy loading
    {title:'Connexion utilisateur', path: 'login-user', loadComponent: () => import('./views/login-user/login-user.component').then(c => c.LoginUserComponent) },
    {title: 'Profil utilisateur', canActivate:[authGuard], path: 'profile', loadComponent: () => import('./views/profile/profile.component').then(c => c.ProfileComponent)},
    {title:'Inscription utilisateur', path: 'registration-user', loadComponent: () => import('./views/registration-user/registration-user.component').then(c => c.RegistrationUserComponent) },
    {title:'Inscription professionnel de santé', path: 'registration-health-professional', loadComponent: () => import('./views/registration-health-professional/registration-health-professional.component').then(c => c.RegistrationHealthProfessionalComponent)},
    {title:'Connexion professionnel de santé', path: 'login-health-professional', loadComponent: () => import('./views/login-health-professional/login-health-professional.component').then(c => c.LoginHealthProfessionalComponent) },
    {title:'Accueil', path: 'home', loadComponent: () => import('./views/home/home.component').then(c => c.HomeComponent) },
    {title:'Liste des professionnels de santé', canActivate:[authGuard] ,path: 'list-health-professional', loadComponent: () => import('./views/list-health-professional/list-health-professional.component').then(c => c.ListHealthProfessionalComponent) },
    {title: 'Confirmation rendez-vous', canActivate:[authUserGuard], path: 'confirmation-appointment', loadComponent: () => import('./views/list-health-professional/list-health-professional-details/list-health-professional-details.component').then(c => c.ListHealthProfessionalDetailsComponent) },
    {title :'Mes rendez-vous', canActivate:[authGuard], path: 'appointments', loadComponent: () => import('./views/list-appointment/list-appointment.component').then(c => c.ListAppointmentComponent) },
];
 