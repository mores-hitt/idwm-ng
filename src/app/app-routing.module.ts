import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_pages/auth/login/login.component';
import { RegisterComponent } from './_pages/auth/register/register.component';
import { ProductListComponent } from './_pages/product/product-list/product-list.component';
import { ProductEditComponent } from './_pages/product/product-edit/product-edit.component';
import { ClientListComponent } from './_pages/admin/client-list/client-list.component';
import { authGuard } from './_guards/auth.guard';
import { ProductAddComponent } from './_pages/product/product-add/product-add.component';
import { EditProfileComponent } from './_pages/profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './_pages/profile/change-password/change-password.component';
import { ReceiptListComponent } from './_pages/admin/receipt-list/receipt-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'products/:pageNumber/:pageSize',
        component: ProductListComponent,
      },
      {
        path: 'product/add',
        component: ProductAddComponent,
      },
      {
        path: 'product/edit/:id',
        component: ProductEditComponent,
      },
      {
        path: 'clients',
        component: ClientListComponent,
      },
      {
        path: 'profile/edit/:id',
        component: EditProfileComponent,
      },
      {
        path: 'change-password/:id',
        component: ChangePasswordComponent,
      },
      {
        path: 'receipts',
        component: ReceiptListComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
