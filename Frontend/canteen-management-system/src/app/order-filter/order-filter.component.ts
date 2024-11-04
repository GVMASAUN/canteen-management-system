import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { OrderService } from '../order.service';
import { User } from '../user';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css']
})
export class OrderFilterComponent {
  users: any[] = [];
  selectedUser: string = 'all';

  @Output() filterChange = new EventEmitter<string>();

  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response: User[]) => {
      this.users = response;
    });
  }

  onUserChange(): void {
    this.filterChange.emit(this.selectedUser);
  }
}

