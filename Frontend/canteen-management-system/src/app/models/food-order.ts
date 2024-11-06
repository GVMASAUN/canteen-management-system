import { OrderDetails } from './order-details';
export interface FoodOrder {
    orderId: number;
    orderDate: Date;
    orderDetails: OrderDetails[];
    userId: number;
    userName: string;
    totalPrice: number;
}
