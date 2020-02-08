import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './web/home/home.component';
import { SkillsComponent } from './web/skills/skills.component';
import { AboutComponent } from './web/about/about.component';
import { LoginComponent } from './admin/login/login.component';
import { PortfolioComponent } from './admin/portfolio/portfolio.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SkillsComponent,
    AboutComponent,
    LoginComponent,
    PortfolioComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
