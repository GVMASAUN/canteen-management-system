import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFoodItemComponent } from './edit-food-item/edit-food-item.component';
import { AddFoodItemComponent } from './add-food-item/add-food-item.component';

const routes: Routes = [
  {
    path: '', component: EditFoodItemComponent
  },
  {
    path: 'add', component: AddFoodItemComponent
  },
  {
    path: 'edit/:id', component: AddFoodItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodItemsRoutingModule { }
