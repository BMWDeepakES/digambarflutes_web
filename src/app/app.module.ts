import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
  SocialAuthService
} from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { MenuComponent } from './component/header/menu/menu.component';
import { PopularComponent } from './component/home/popular/popular.component';

// Import the library
import { CarouselModule } from 'ngx-owl-carousel-o';
// Needs to import the BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductdetailsComponent } from './component/productdetails/productdetails.component';
import { Menu2Component } from './component/header/menu2/menu2.component';
import { ConfigurationComponent } from './component/productdetails/configuration/configuration.component';
import { UserinfoComponent } from './component/productdetails/userinfo/userinfo.component';
import { ConfirmationComponent } from './component/productdetails/confirmation/confirmation.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { AccountService } from './services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './component/register/register.component';
import { CartComponent } from './component/cart/cart.component';
import { PaymentGatewayComponent } from './component/payment-gateway/payment-gateway.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    PopularComponent,
    ProductdetailsComponent,
    Menu2Component,
    ConfigurationComponent,
    UserinfoComponent,
    ConfirmationComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    PaymentGatewayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},AccountService, SocialAuthService, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '761689346542-vma71jljg76ek766feuc2c0nmo7i46uf.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('419759909345362')
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
