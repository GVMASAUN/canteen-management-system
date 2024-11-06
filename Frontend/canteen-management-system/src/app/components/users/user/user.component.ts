import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  response: GenericResponseDTO<User>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
    });
  }

  editUser(userId: number): void {
    this.router.navigate(['users', 'edit', userId]);
  }

  deleteUser(userId: number): void {
    const confirmation = confirm("This user may have orders. Do you really want to delete?");
    if (confirmation) {
      this.userService.deleteUser(userId).subscribe(response => {
        this.response = response;
        this.getUsers();
      });
    }
  }
}
