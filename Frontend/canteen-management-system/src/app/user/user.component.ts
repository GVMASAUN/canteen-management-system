import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  response: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  addUser(): void {
    this.router.navigate(['/register']);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  editUser(userId: string): void {
    this.router.navigate(['/register', { id: userId }]);
  }

  deleteUser(userId: number) {
    const confirmation = confirm("This user may have orders. Do you really want to delete?");
    if (confirmation) {
      this.userService.deleteUser(userId).subscribe(response => {
        this.response = response;
        this.getUsers();
      });
    }
  }
}
