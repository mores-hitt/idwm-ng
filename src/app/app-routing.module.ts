import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_pages/auth/login/login.component';
import { RegisterComponent } from './_pages/auth/register/register.component';
import { ProductListComponent } from './_pages/product/product-list/product-list.component';
import { ProductEditComponent } from './_pages/product/product-edit/product-edit.component';
import { authGuard } from './_guards/auth.guard';

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
        path: 'product/edit/:id',
        component: ProductEditComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
