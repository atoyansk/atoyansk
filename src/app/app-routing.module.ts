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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',           component: HomeComponent },
  { path: 'about',          component: AboutComponent },
  { path: 'skills',         component: SkillsComponent },
  { path: 'contact',        component: ContactComponent },
  { path: 'login',          component: LoginComponent },
  { path: 'admin', redirectTo: 'dashboard'},
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'adm-about',      component: AdmAboutComponent },
  { path: 'adm-services',   component: AdmServicesComponent },
  { path: 'adm-messages',   component: AdmMessagesComponent },
  { path: 'adm-portfolio',  component: AdmPortfolioComponent },
  { path: 'adm-skills',     component: AdmSkillsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
