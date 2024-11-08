import { IFoodItem } from "./food-item";

export interface IOrderDetails {
    foodItem: IFoodItem;
    id: number;
    quantity: number;
    totalPrice: number;
}
