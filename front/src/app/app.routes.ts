import { Routes } from '@angular/router';
import { authUserGuard } from './guards/authUser.guard';
import { authGuard } from './guards/auth.guard';
import { isAdminGuard } from './guards/isAdmin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login-user', pathMatch: 'full' },
    //lazy loading
    {title:'Connexion utilisateur', path: 'login-user', loadComponent: () => import('./views/login-user/login-user.component').then(c => c.LoginUserComponent) },
    {title:'Profil utilisateur', canActivate:[authGuard], path: 'profile', loadComponent: () => import('./views/profile/profile.component').then(c => c.ProfileComponent)},
    {title:'Inscription utilisateur', path: 'registration-user', loadComponent: () => import('./views/registration-user/registration-user.component').then(c => c.RegistrationUserComponent) },
    {title:'Inscription professionnel de santé', path: 'registration-health-professional', loadComponent: () => import('./views/registration-health-professional/registration-health-professional.component').then(c => c.RegistrationHealthProfessionalComponent)},
    {title:'Connexion professionnel de santé', path: 'login-health-professional', loadComponent: () => import('./views/login-health-professional/login-health-professional.component').then(c => c.LoginHealthProfessionalComponent) },
    {title:'Accueil', path: 'home', loadComponent: () => import('./views/home/home.component').then(c => c.HomeComponent) },
    {title:'Liste des professionnels de santé', canActivate:[authGuard] ,path: 'list-health-professional', loadComponent: () => import('./views/list-health-professional/list-health-professional.component').then(c => c.ListHealthProfessionalComponent) },
    {title:'Confirmation rendez-vous', canActivate:[authUserGuard], path: 'confirmation-appointment', loadComponent: () => import('./views/list-health-professional/list-health-professional-details/list-health-professional-details.component').then(c => c.ListHealthProfessionalDetailsComponent) },
    {title :'Mes rendez-vous', canActivate:[authGuard], path: 'appointments', loadComponent: () => import('./views/list-appointment/list-appointment.component').then(c => c.ListAppointmentComponent) },
    {title :'Mentions légales', path: 'legal-notice', loadComponent: () => import('./views/pages/legal-notice/legal-notice.component').then(c => c.LegalNoticeComponent) },
    {title :'Contact', path: 'contact', loadComponent: () => import('./views/pages/contact/contact.component').then(c => c.ContactComponent) },
    {title: 'Panel admin',canActivate:[isAdminGuard], path: 'panel-admin', loadComponent: () => import('./views/panel-admin/panel-admin.component').then(c => c.PanelAdminComponent),
    children: [
        { path: 'users', loadComponent: () => import('./views/panel-admin/panel-admin-user/panel-admin-user.component').then(c => c.PanelAdminUserComponent) },
        { path: 'health-professionals', loadComponent: () => import('./views/panel-admin/panel-admin-health-professional/panel-admin-health-professional.component').then(c => c.PanelAdminHealthProfessionalComponent) },
        { path: '', redirectTo: 'health-professionals', pathMatch: 'full' }
      ]}
]; 
 