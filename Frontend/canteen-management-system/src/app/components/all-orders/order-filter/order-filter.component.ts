import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { OrderService } from '../../../services/order/order.service';
import { IUser } from '../../../models/user';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css']
})
export class OrderFilterComponent {
  public users: IUser[] = [];
  public selectedUser: string;

  @Output() filterChange = new EventEmitter<string>();

  public constructor(private userService: UserService, private orderService: OrderService) { }

  public ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
    });
  }

  public onUserChange(): void {
    this.filterChange.emit(this.selectedUser);
  }
}

