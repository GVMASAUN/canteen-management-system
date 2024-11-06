import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { AdminGuard, UserGuard } from './core/user/user.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders/orders.component';
import { UserComponent } from './components/users/user/user.component';
import { UserOrdersComponent } from './components/all-orders/user-orders/user-orders.component';
import { MenuComponent } from './components/food-item-menu/menu/menu.component';

const routes: Routes = [
  { path: "", component: LoginComponent },

  { path: "login", component: LoginComponent },

  { path: "register", component: RegisterComponent, canActivate: [AdminGuard] },

  { path: "menu", component: MenuComponent, canActivate: [UserGuard] },

  { path: "menu/:id", component: MenuComponent, canActivate: [AdminGuard] },

  {
    path: "foodItems",
    loadChildren: () => import(`./components/food-items/food-items.module`).then(m => m.FoodItemsModule),
    canActivate: [AdminGuard]
  },

  { path: "orders", component: OrdersComponent },

  {
    path: "users",
    loadChildren: () => import(`./components/users/users.module`).then(m => m.UsersModule),
    canActivate: [AdminGuard]
  },

  { path: "all-orders", component: UserOrdersComponent },

  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
