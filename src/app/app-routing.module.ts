import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './web/home/home.component';
import { AboutComponent } from './web/about/about.component';
import { SkillsComponent } from './web/skills/skills.component';
import { ContactComponent } from './web/contact/contact.component';

import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdmAboutComponent } from './admin/adm-about/adm-about.component';
import { AdmServicesComponent } from './admin/adm-services/adm-services.component';
import { AdmMessagesComponent } from './admin/adm-messages/adm-messages.component';
import { AdmPortfolioComponent } from './admin/adm-portfolio/adm-portfolio.component';
import { AdmSkillsComponent } from './admin/adm-skills/adm-skills.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',           component: HomeComponent },
  { path: 'about',          component: AboutComponent },
  { path: 'skills',         component: SkillsComponent },
  { path: 'contact',        component: ContactComponent },
  { path: 'admin', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login',          component: LoginComponent },
  { path: 'dashboard',      component: DashboardComponent,  canActivate: [AuthGuard] },
  { path: 'adm-about',      component: AdmAboutComponent,  canActivate: [AuthGuard] },
  { path: 'adm-services',   component: AdmServicesComponent,  canActivate: [AuthGuard] },
  { path: 'adm-messages',   component: AdmMessagesComponent,  canActivate: [AuthGuard] },
  { path: 'adm-portfolio',  component: AdmPortfolioComponent,  canActivate: [AuthGuard] },
  { path: 'adm-skills',     component: AdmSkillsComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
