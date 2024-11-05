import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItem } from 'src/app/models/food-item';
import { UserOrder } from 'src/app/models/user-order';
import { FoodItemsService } from 'src/app/services/food-item/food-items.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
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
