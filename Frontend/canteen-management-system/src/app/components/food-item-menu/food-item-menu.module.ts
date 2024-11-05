import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodItemMenuRoutingModule } from './food-item-menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FoodItemMenuRoutingModule
  ]
})
export class FoodItemMenuModule { }
