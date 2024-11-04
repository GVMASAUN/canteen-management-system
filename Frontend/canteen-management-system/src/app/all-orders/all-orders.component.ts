import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  @Input() selectedUser: string = 'all';
  orders: any[] = [];
  filteredOrders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(response => {
      this.orders = response.foodOrders;
      this.filterOrders(this.selectedUser);
    });
  }

  ngOnChanges(): void {
    this.filterOrders(this.selectedUser);
  }

  filterOrders(selectedUser: string): void {
    if (selectedUser === 'all') {
      this.filteredOrders = this.orders;
    } else {

      this.filteredOrders = this.orders.filter(order => order.userId == selectedUser);
    }
  }
}
