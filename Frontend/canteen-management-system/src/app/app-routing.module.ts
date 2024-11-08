import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard, UserGuard } from './core/user/user.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: "", component: LoginComponent },

  { path: "login", component: LoginComponent },

  {
    path: "food-item",
    loadChildren: () => import(`./components/food-items/food-items.module`).then(m => m.FoodItemsModule),
    canActivate: [AdminGuard]
  },

  {
    path: "order",
    loadChildren: () => import(`./components/orders/orders.module`).then(m => m.OrdersModule),
  },

  {
    path: "user",
    loadChildren: () => import(`./components/users/users.module`).then(m => m.UsersModule),
    canActivate: [AdminGuard]
  },

  {
    path: "all-orders",
    loadChildren: () => import(`./components/all-orders/all-orders.module`).then(m => m.AllOrdersModule),
    canActivate: [AdminGuard]
  },

  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
