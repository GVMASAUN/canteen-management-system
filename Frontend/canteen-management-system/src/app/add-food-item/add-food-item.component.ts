import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodItemsService } from '../food-items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItem } from '../food-item';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {
  foodItemForm: FormGroup;
  isEditing: boolean = false;
  foodItemId: any;
  response: any;
  navigation: any;

  constructor(private formBuilder: FormBuilder, private foodItemService: FoodItemsService, private router: Router, private route: ActivatedRoute) {
    this.foodItemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemPrice: ['', Validators.required]
    });
    this.navigation = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.foodItemId = this.route.snapshot.paramMap.get('id');

    if (this.navigation?.extras.state) {
      const foodItem: FoodItem = this.navigation.extras.state['foodItem'];
      if (foodItem) {
        this.isEditing = true;
        this.loadFoodItem(foodItem);
      }
    }
  }

  loadFoodItem(foodItem: FoodItem): void {
    this.foodItemForm.patchValue({
      itemName: foodItem.itemName,
      itemPrice: foodItem.itemPrice
    });
  }

  private markAllAsTouched(): void {
    Object.keys(this.foodItemForm.controls).forEach(control => {
      this.foodItemForm.get(control)?.markAsTouched();
    });
  }

  addItem(): void {

    if (this.foodItemForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    if (this.foodItemForm.valid) {
      const updatedItem: FoodItem = {
        itemId: this.isEditing ? this.foodItemId : 0,
        itemName: this.foodItemForm.controls['itemName'].value,
        itemPrice: this.foodItemForm.controls['itemPrice'].value,
        quantity: 0
      };

      if (this.isEditing) {
        this.foodItemService.editFoodItem(updatedItem).subscribe(response => {
          this.response = response;
          if (response.statusCode === 200) {
            this.router.navigate(['/editItems']);
          }
        });
      } else {
        this.foodItemService.addFoodItem(updatedItem).subscribe(response => {
          this.response = response;
          if (response.statusCode === 200) {
            this.router.navigate(['/editItems']);
          }
        });
      }
    }
  }
}
