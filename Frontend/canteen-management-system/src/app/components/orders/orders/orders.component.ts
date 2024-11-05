import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(response => {
      this.orders = response.foodOrders;
    });
  }

  editOrder(order: any): void {
    this.router.navigate(['/menu', order.orderId], {
      state: { orderDetails: order.orderDetails }
    });
  }

}
