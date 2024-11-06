import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItem } from 'src/app/models/food-item';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';
import { FoodItemsService } from 'src/app/services/food-item/food-items.service';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {
  private readonly ok: number = 200;
  foodItemForm: FormGroup;
  isEditing: boolean = false;
  foodItemId: number;
  response: GenericResponseDTO<FoodItem>;

  constructor(private formBuilder: FormBuilder, private foodItemService: FoodItemsService, private router: Router, private route: ActivatedRoute) {
    this.foodItemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemPrice: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.foodItemId = parseInt(id);
      this.foodItemService.getFoodItem(this.foodItemId).subscribe(response => {
        const foodItem: FoodItem = response.data;
        if (foodItem) {
          this.isEditing = true;
          this.loadFoodItem(foodItem);
        }
      });
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
        itemPrice: this.foodItemForm.controls['itemPrice'].value
      };

      if (this.isEditing) {
        this.foodItemService.editFoodItem(updatedItem).subscribe(response => {
          this.response = response;
        });
      } else {
        this.foodItemService.addFoodItem(updatedItem).subscribe(response => {
          this.response = response;
        });
      }
      this.router.navigate(['/foodItems']);
    }
  }
}
