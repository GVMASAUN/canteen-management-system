import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { NavComponent } from './nav/nav.component';
import { AddFoodItemComponent } from './add-food-item/add-food-item.component';
import { EditFoodItemComponent } from './edit-food-item/edit-food-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrderFilterComponent } from './order-filter/order-filter.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FoodItemsComponent,
    NavComponent,
    AddFoodItemComponent,
    EditFoodItemComponent,
    NotFoundComponent,
    OrdersComponent,
    UserComponent,
    AllOrdersComponent,
    OrderFilterComponent,
    UserOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
