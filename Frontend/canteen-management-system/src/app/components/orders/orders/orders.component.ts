import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { FoodOrder } from 'src/app/models/food-order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: FoodOrder[] = [];
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrder().subscribe(response => {
      this.orders = response.data;
    });
  }

  editOrder(order: FoodOrder): void {
    this.router.navigate(['/menu', order.orderId]);
  }

}
