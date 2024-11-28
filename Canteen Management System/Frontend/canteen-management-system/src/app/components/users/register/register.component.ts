import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IUser } from '../../../models/user';
import { RegisterService } from '../../../services/user/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { IGenericResponse } from 'src/app/models/generic-response-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  private readonly NAME_PATTERN: string = '^[a-zA-Z ]+$';
  private readonly PHONE_PATTERN: string = '^[0-9]{10}$';
  public roles = Role;
  private user: IUser;
  public isEditing: boolean = false;
  private userId: number;
  public response: IGenericResponse<IUser>;

  public constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router, private route: ActivatedRoute) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.NAME_PATTERN)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator()]],
      role: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.PHONE_PATTERN)]]
    });
  }

  private confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const confirmationValue = control.value;
      const passwordValue = this.registerForm?.get('password')?.value;
      const isMatched = confirmationValue === passwordValue;
      return isMatched ? null : { passwordMismatch: true };
    }
  }

  private markAllAsTouched(): void {
    Object.keys(this.registerForm.controls).forEach(control => {
      this.registerForm.get(control)?.markAsTouched();
    });
  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = parseInt(id);
    }
    if (this.userId) {
      this.isEditing = true;
      this.loadUserData(this.userId);
    }
  }

  private loadUserData(userId: number): void {
    this.registerService.getUserById(userId).subscribe(response => {
      this.user = response.data;
      this.registerForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
        phoneNumber: this.user.phoneNumber,
      });
    });
  }

  private navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  registerUser(): void {
    if (this.registerForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const userData = this.registerForm.value;

    if (this.isEditing) {
      this.registerService.updateUser(this.userId, userData).subscribe(response => {
        this.response = response;
        this.navigateToUsers();
      });
    } else {
      this.registerService.registerUser(userData).subscribe(response => {
        this.response = response;
        this.navigateToUsers();
      });
    }

    if (!this.response?.error) {
      this.registerForm.reset();
    }
  }
}
