import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { OrderService } from '../../../services/order/order.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css']
})
export class OrderFilterComponent {
  users: User[] = [];
  selectedUser: string;

  @Output() filterChange = new EventEmitter<string>();

  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
    });
  }

  onUserChange(): void {
    this.filterChange.emit(this.selectedUser);
  }
}

