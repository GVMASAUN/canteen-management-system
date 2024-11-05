import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodItemsRoutingModule } from './food-items-routing.module';
import { AddFoodItemComponent } from './add-food-item/add-food-item.component';
import { EditFoodItemComponent } from './edit-food-item/edit-food-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AddFoodItemComponent,
    EditFoodItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FoodItemsRoutingModule
  ]
})
export class FoodItemsModule { }
