import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../../../models/food-item';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodItemsService } from '../../../services/food-item/food-items.service';

@Component({
  selector: 'app-edit-food-item',
  templateUrl: './edit-food-item.component.html',
  styleUrls: ['./edit-food-item.component.css']
})
export class EditFoodItemComponent implements OnInit {
  foodItems: FoodItem[] = [];
  currentItem?: FoodItem;
  response: any;

  constructor(private foodItemsService: FoodItemsService, private router: Router) {
  }

  ngOnInit(): void {
    this.foodItemsService.getFoodItems().subscribe(response => {
      this.foodItems = response?.foodItems;
    });
  }

  edit(itemId: number): void {
    this.currentItem = this.foodItems.find(item => item.itemId == itemId);
    this.router.navigate(['foodItems', 'edit', itemId], {
      state: {
        foodItem: this.currentItem
      }
    });
  }
}
