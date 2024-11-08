import { IOrderDetails } from './order-details';
export interface IFoodOrder {
    orderId: number;
    orderDate: Date;
    orderDetails: IOrderDetails[];
    userId: number;
    userName: string;
    totalPrice: number;
}
