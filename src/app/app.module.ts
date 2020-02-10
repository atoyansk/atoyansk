import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './web/home/home.component';
import { SkillsComponent } from './web/skills/skills.component';
import { AboutComponent } from './web/about/about.component';
import { LoginComponent } from './admin/login/login.component';
import { AdmAboutComponent } from './admin/adm-about/adm-about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdmPortfolioComponent } from './admin/adm-portfolio/adm-portfolio.component';
import { AdmMessagesComponent } from './admin/adm-messages/adm-messages.component';
import { AdmSkillsComponent } from './admin/adm-skills/adm-skills.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SkillsComponent,
    AboutComponent,
    LoginComponent,
    AdmAboutComponent,
    DashboardComponent,
    AdmPortfolioComponent,
    AdmMessagesComponent,
    AdmSkillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
