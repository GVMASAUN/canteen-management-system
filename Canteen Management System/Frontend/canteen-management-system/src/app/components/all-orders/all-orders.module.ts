import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllOrdersRoutingModule } from './all-orders-routing.module';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrderFilterComponent } from './order-filter/order-filter.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllOrdersComponent,
    OrderFilterComponent,
    UserOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AllOrdersRoutingModule
  ]
})
export class AllOrdersModule { }
