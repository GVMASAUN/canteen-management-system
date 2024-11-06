import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from '../../../models/user';
import { RegisterService } from '../../../services/user/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles = Role;
  user: User;
  isEditing: boolean = false;
  userId: number;
  response: GenericResponseDTO<User>;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router, private route: ActivatedRoute) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator()]],
      role: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = parseInt(id);
    }
    if (this.userId) {
      this.isEditing = true;
      this.loadUserData(this.userId);
    }
  }

  loadUserData(userId: number): void {
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

  registerUser(): void {
    if (this.registerForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const userData = this.registerForm.value;

    if (this.isEditing) {
      this.registerService.updateUser(this.userId, userData).subscribe(response => {
        this.response = response;
      });
    } else {
      this.registerService.registerUser(userData).subscribe(response => {
        this.response = response;
      });
    }

    if (!this.response?.error) {
      this.registerForm.reset();
    }
    this.router.navigate(['/users']);
  }
}
