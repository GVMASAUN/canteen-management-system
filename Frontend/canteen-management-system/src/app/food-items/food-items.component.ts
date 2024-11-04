import { Component, OnInit } from '@angular/core';
import { FoodItemsService } from '../food-items.service';
import { FoodItem } from '../food-item';
import { UserOrder } from '../user-order';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css']
})
export class FoodItemsComponent implements OnInit {
  foodItems: FoodItem[] = [];
  userOrder: UserOrder[] = [];
  response: any;
  orderId: string | null = null;
  isEditing: boolean = false;
  navigation: any = null;

  constructor(private foodItemsService: FoodItemsService, private route: ActivatedRoute, private router: Router, private location: Location) {
    this.navigation = router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.foodItemsService.getFoodItems().subscribe(response => {
      this.foodItems = response?.foodItems;
    });

    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
    });

    if (this.navigation?.extras.state) {
      const orderDetails = this.navigation.extras.state['orderDetails'];

      if (orderDetails) {
        this.isEditing = true;
        this.loadOrderDetails(orderDetails);
      }
    }
  }

  loadOrderDetails(orderDetails: any[]): void {
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
      this.foodItemsService.updateOrder(this.orderId, this.userOrder).subscribe(response => {
        this.response = response;
        this.router.navigate(['/orders']);
      });
    } else {
      this.foodItemsService.placeOrder(this.userOrder).subscribe(response => {
        this.userOrder = [];
        this.response = response;
        this.router.navigate(['/orders']);
      });
    }
  }
}
