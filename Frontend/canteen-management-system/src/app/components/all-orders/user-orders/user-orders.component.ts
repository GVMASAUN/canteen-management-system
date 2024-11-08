import { Component } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {
  private readonly ALL: string = "all";
  public selectedUser: string = this.ALL;

  public onUserChange(userId: string): void {
    this.selectedUser = userId;
  }
}
