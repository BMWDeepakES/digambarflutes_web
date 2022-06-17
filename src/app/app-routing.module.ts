import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ConfigurationComponent } from './component/productdetails/configuration/configuration.component';
import { ConfirmationComponent } from './component/productdetails/confirmation/confirmation.component';
import { ProductdetailsComponent } from './component/productdetails/productdetails.component';
import { UserinfoComponent } from './component/productdetails/userinfo/userinfo.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home' , component:HomeComponent},
  { path: 'product_details', component:ProductdetailsComponent },
  { path: 'configuration', component:ConfigurationComponent },
  { path: 'userinfo', component:UserinfoComponent },
  { path: 'confirm', component:ConfirmationComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'cart', component:CartComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
