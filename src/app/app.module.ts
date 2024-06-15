import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { RegisterComponent } from './_pages/auth/register/register.component';
import { TextInputComponent } from './_components/text-input/text-input.component';
import { SelectInputComponent } from './_components/select-input/select-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TextInputComponent,
    SelectInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
