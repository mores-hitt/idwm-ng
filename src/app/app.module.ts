import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { RegisterComponent } from './_pages/auth/register/register.component';
import { TextInputComponent } from './_components/text-input/text-input.component';
import { SelectInputComponent } from './_components/select-input/select-input.component';
import { ProductListComponent } from './_pages/product/product-list/product-list.component';
import { ProductItemComponent } from './_components/product-item/product-item.component';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { ProductEditComponent } from './_pages/product/product-edit/product-edit.component';
import { SearchBarComponent } from './_components/search-bar/search-bar.component';
import { BuyModalComponent } from './_components/buy-modal/buy-modal.component';
import { ClientListComponent } from './_pages/admin/client-list/client-list.component';
import { SearchClientBarComponent } from './_components/search-client-bar/search-client-bar.component';
import { ProductAddComponent } from './_pages/product/product-add/product-add.component';
import { EditProfileComponent } from './_pages/profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './_pages/profile/change-password/change-password.component';
import { ReceiptListComponent } from './_pages/admin/receipt-list/receipt-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TextInputComponent,
    SelectInputComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductEditComponent,
    SearchBarComponent,
    BuyModalComponent,
    ClientListComponent,
    SearchClientBarComponent,
    ProductAddComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    ReceiptListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
