import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItem } from 'src/app/models/food-item';
import { FoodOrder } from 'src/app/models/food-order';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';
import { OrderDetails } from 'src/app/models/order-details';
import { UserOrder } from 'src/app/models/user-order';
import { FoodItemsService } from 'src/app/services/food-item/food-items.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  foodItems: FoodItem[] = [];
  userOrder: UserOrder[] = [];
  response: GenericResponseDTO<FoodOrder>;
  orderId: number;
  isEditing: boolean = false;

  constructor(private orderService: OrderService, private foodItemsService: FoodItemsService, private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  ngOnInit(): void {
    this.foodItemsService.getFoodItems().subscribe(response => {
      this.foodItems = response.data;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.orderId = parseInt(id);
      }
    });

    if (this.orderId) {
      this.orderService.getOrderDetail(this.orderId).subscribe(response => {
        const orderDetails = response.data.orderDetails;
        if (orderDetails) {
          this.isEditing = true;
          this.loadOrderDetails(orderDetails);
        }
      });
    }
  }

  loadOrderDetails(orderDetails: OrderDetails[]): void {
    this.userOrder = orderDetails.map(item => ({
      itemId: item.foodItem.itemId,
      itemName: item.foodItem.itemName,
      quantity: item.quantity
    }));
  }

  addItem(itemId: number): void {
    const foodItem = this.foodItems.find(item => item.itemId === itemId);
    if (!foodItem) {
      return;
    }
    const existingOrder = this.userOrder.find(order => order.itemId === itemId);

    if (existingOrder) {
      existingOrder.quantity += 1;
    } else {
      this.userOrder.push({ itemId, itemName: foodItem.itemName, quantity: 1 });
    }
  }

  removeItem(itemId: number): void {
    const existingOrder = this.userOrder.find(order => order.itemId === itemId);

    if (existingOrder) {
      if (existingOrder.quantity > 1) {
        existingOrder.quantity -= 1;
      } else {
        const existingOrderIndex = this.userOrder.findIndex(order => order.itemId === itemId);
        if (existingOrderIndex > -1) {
          this.userOrder.splice(existingOrderIndex, 1);
        }
      }
    }
  }

  placeOrder(): void {
    if (this.userOrder.length === 0) {
      alert('No items in the order to place.');
      return;
    }

    if (this.isEditing && this.orderId) {
      this.orderService.updateOrder(this.orderId, this.userOrder).subscribe(response => {
        this.response = response;
      });
    } else {
      this.orderService.placeOrder(this.userOrder).subscribe(response => {
        this.userOrder = [];
        this.response = response;
      });
    }
    this.router.navigate(['/orders']);
  }
}
