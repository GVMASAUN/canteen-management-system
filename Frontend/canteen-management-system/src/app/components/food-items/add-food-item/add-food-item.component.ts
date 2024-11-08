import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IFoodItem } from 'src/app/models/food-item';
import { IGenericResponse } from 'src/app/models/generic-response-dto';
import { FoodItemsService } from 'src/app/services/food-item/food-items.service';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {
  private readonly ok: number = 200;
  public foodItemForm: FormGroup;
  public isEditing: boolean = false;
  public foodItemId: number;
  public response: IGenericResponse<IFoodItem>;

  public constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddFoodItemComponent>, private foodItemService: FoodItemsService, private router: Router, private route: ActivatedRoute) {
    this.foodItemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemPrice: ['', Validators.required]
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    if (this.foodItemId) {
      this.foodItemService.getFoodItem(this.foodItemId).subscribe(response => {
        const foodItem: IFoodItem = response.data;
        if (foodItem) {
          this.isEditing = true;
          this.loadFoodItem(foodItem);
        }
      });
    }
  }

  private loadFoodItem(foodItem: IFoodItem): void {
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

  public addItem(): void {

    if (this.foodItemForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    if (this.foodItemForm.valid) {
      const updatedItem: IFoodItem = {
        itemId: this.isEditing ? this.foodItemId : 0,
        itemName: this.foodItemForm.controls['itemName'].value,
        itemPrice: this.foodItemForm.controls['itemPrice'].value
      };

      if (this.isEditing) {
        this.foodItemService.editFoodItem(updatedItem).subscribe(response => {
          this.response = response;
          this.close();
        });
      } else {
        this.foodItemService.addFoodItem(updatedItem).subscribe(response => {
          this.response = response;
          this.close();
        });
      }
    }
  }
}
