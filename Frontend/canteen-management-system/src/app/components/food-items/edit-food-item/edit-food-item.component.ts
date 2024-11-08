import { Component, OnInit } from '@angular/core';
import { IFoodItem } from '../../../models/food-item';
import { Router } from '@angular/router';
import { FoodItemsService } from '../../../services/food-item/food-items.service';
import { IGenericResponse } from 'src/app/models/generic-response-dto';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodItemComponent } from '../add-food-item/add-food-item.component';

@Component({
  selector: 'app-edit-food-item',
  templateUrl: './edit-food-item.component.html',
  styleUrls: ['./edit-food-item.component.css']
})
export class EditFoodItemComponent implements OnInit {
  public foodItems: IFoodItem[] = [];
  public response: IGenericResponse<IFoodItem[]>;
  private isEditting: boolean = false;
  public foodItemId: number;

  public constructor(private foodItemsService: FoodItemsService, private router: Router, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.fetchFoodItems();
  }

  private fetchFoodItems(): void {
    this.foodItemsService.getFoodItems().subscribe(response => {
      this.response = response;
      this.foodItems = response.data;
    });
  }

  public addAndEdit(): void {
    let dialogRef = this.dialog.open(AddFoodItemComponent, {
      width: '490px',
      height: '370px',
      hasBackdrop: true,
      backdropClass: 'blurred-backdrop'

    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchFoodItems();
      this.isEditting = false;
    });
    if (this.isEditting) {
      dialogRef.componentInstance.isEditing = true;
      dialogRef.componentInstance.foodItemId = this.foodItemId;
    }
  }

  public edit(itemId: number): void {
    this.foodItemId = itemId;
    this.isEditting = true;
    this.addAndEdit();
  }
}
