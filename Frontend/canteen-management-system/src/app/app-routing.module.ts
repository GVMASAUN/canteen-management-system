import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { AdminGuard, UserGuard } from './user.guard';
import { AddFoodItemComponent } from './add-food-item/add-food-item.component';
import { EditFoodItemComponent } from './edit-food-item/edit-food-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent, canActivate: [AdminGuard] },
  { path: "item", component: FoodItemsComponent, canActivate: [UserGuard] },
  { path: "item/:id", component: FoodItemsComponent, canActivate: [AdminGuard] },
  { path: "food", component: AddFoodItemComponent, canActivate: [AdminGuard] },
  { path: "food/:id", component: AddFoodItemComponent, canActivate: [AdminGuard] },
  { path: "editItems", component: EditFoodItemComponent, canActivate: [AdminGuard] },
  { path: "orders", component: OrdersComponent, canActivate: [UserGuard] },
  { path: "users", component: UserComponent, canActivate: [UserGuard] },
  { path: "all-orders", component: UserOrdersComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
