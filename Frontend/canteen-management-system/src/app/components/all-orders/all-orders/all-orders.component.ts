import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { filter } from 'rxjs';
import { FoodOrder } from 'src/app/models/food-order';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  @Input() selectedUser: string;
  orders: FoodOrder[] = [];
  filteredOrders: FoodOrder[] = [];
  response: GenericResponseDTO<FoodOrder[]>;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(response => {
      this.orders = response.data;
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
      this.orderService.getSpecificUserOrder(parseInt(selectedUser, 10)).subscribe(response => {
        this.response = response;
        this.filteredOrders = response.data;

        if (!this.filteredOrders.length) {
          this.response.message = `No orders for this User`;
        } else {
          this.response.message = ``;
        }
      });
    }
  }
}
