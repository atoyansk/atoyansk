import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './web/home/home.component';
import { SkillsComponent } from './web/skills/skills.component';
import { AboutComponent } from './web/about/about.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { AdmAboutComponent } from './admin/adm-about/adm-about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdmPortfolioComponent } from './admin/adm-portfolio/adm-portfolio.component';
import { AdmMessagesComponent } from './admin/adm-messages/adm-messages.component';
import { AdmSkillsComponent } from './admin/adm-skills/adm-skills.component';
import { FooterComponent } from './web/footer/footer.component';
import { HeaderComponent } from './web/header/header.component';
import { ContactComponent } from './web/contact/contact.component';
import { AdmServicesComponent } from './admin/adm-services/adm-services.component';

import { AuthService } from './services/auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { AuthGuard } from './utils/auth.guard';
import { VerifyEmailAddressComponent } from './admin/verify-email-address/verify-email-address.component';



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
    AdmSkillsComponent,
    FooterComponent,
    HeaderComponent,
    ContactComponent,
    AdmServicesComponent,
    RegisterUserComponent,
    ForgotPasswordComponent,
    VerifyEmailAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FontAwesomeModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
