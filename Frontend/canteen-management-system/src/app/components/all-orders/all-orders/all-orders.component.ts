import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { IFoodOrder } from 'src/app/models/food-order';
import { IGenericResponse } from 'src/app/models/generic-response-dto';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  @Input() public selectedUser: string;
  public filteredOrders: IFoodOrder[] = [];
  public response: IGenericResponse<IFoodOrder[]>;

  constructor(private orderService: OrderService) { }

  public ngOnInit(): void {
    this.filterOrders(this.selectedUser);
  }

  public ngOnChanges(): void {
    this.filterOrders(this.selectedUser);
  }

  private filterOrders(selectedUser: string): void {
    this.orderService.getUserOrder(selectedUser).subscribe(response => {
      this.filteredOrders = response.data;
      this.response = response;
      if (!this.filteredOrders.length) {
        this.response.message = `No orders for this User`;
      } else {
        this.response.message = ``;
      }
    });
  }
}
