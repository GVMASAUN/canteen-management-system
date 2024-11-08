import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'create-order', component: MenuComponent },
  { path: 'edit-order/:id', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
