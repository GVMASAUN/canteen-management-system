import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../../models/user';
import { RegisterService } from '../../../services/user/register.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  isEditing: boolean = false;
  userId: any;
  response: any;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router, private route: ActivatedRoute) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  private markAllAsTouched(): void {
    Object.keys(this.registerForm.controls).forEach(control => {
      this.registerForm.get(control)?.markAsTouched();
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isEditing = true;
      this.loadUserData(this.userId);
    }
  }

  loadUserData(userId: string): void {
    this.registerService.getUserById(userId).subscribe(response => {
      this.user = response;
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
      this.registerService.updateUser(this.userId, userData).subscribe(resp => {
        this.response = resp;
        if (!this.response?.error) {
          this.registerForm.reset();
        }
      });
    } else {
      this.registerService.registerUser(userData).subscribe(response => {
        this.response = response;
        if (!this.response?.error) {
          this.registerForm.reset();
        }
      });
    }
    this.router.navigate(['/users']);
  }
}
