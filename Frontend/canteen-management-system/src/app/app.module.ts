import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationInterceptor } from './core/interceptor/authentication.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { UsersModule } from './components/users/users.module';
import { AllOrdersModule } from './components/all-orders/all-orders.module';
import { NavComponent } from './components/nav/nav.component';
import { OrdersModule } from './components/orders/orders.module';
import { FoodItemsModule } from './components/food-items/food-items.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    NavComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatDialogModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    UsersModule,
    AllOrdersModule,
    OrdersModule,
    FoodItemsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
