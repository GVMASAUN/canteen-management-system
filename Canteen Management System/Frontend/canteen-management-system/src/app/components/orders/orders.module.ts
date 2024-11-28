import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MenuComponent } from './menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrdersComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
