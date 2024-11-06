import { FoodItem } from "./food-item";

export interface OrderDetails {
    foodItem: FoodItem;
    id: number;
    quantity: number;
    totalPrice: number;
}
