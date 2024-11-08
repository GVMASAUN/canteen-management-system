import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { IFoodOrder } from 'src/app/models/food-order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  public orders: IFoodOrder[] = [];

  public constructor(private orderService: OrderService, private router: Router) {
    this.orderService.getOrder().subscribe(response => {
      this.orders = response.data;
    });
  }

  public placeOrder(): void {
    this.router.navigate(['order', 'create-order']);
  }

  public editOrder(order: IFoodOrder): void {
    this.router.navigate(['order', 'edit-order', order.orderId]);
  }

}
