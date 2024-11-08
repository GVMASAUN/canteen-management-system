import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { IGenericResponse } from 'src/app/models/generic-response-dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public users: IUser[] = [];
  public response: IGenericResponse<IUser>;

  public constructor(private userService: UserService, private router: Router) {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
    });
  }

  public editUser(userId: number): void {
    this.router.navigate(['users', 'edit', userId]);
  }

  public deleteUser(userId: number): void {
    const confirmation = confirm("This user may have orders. Do you really want to delete?");
    if (confirmation) {
      this.userService.deleteUser(userId).subscribe(response => {
        this.response = response;
        this.getUsers();
      });
    }
  }
}
