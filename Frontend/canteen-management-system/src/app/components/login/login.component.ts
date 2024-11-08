import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user';
import { LoginService } from '../../services/user/login.service';
import { Router } from '@angular/router';
import { IGenericResponse } from 'src/app/models/generic-response-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly ok: number = 200;
  public loginForm: FormGroup;
  public response: IGenericResponse<IUser>;

  public constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private markAllAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(control => {
      this.loginForm.get(control)?.markAsTouched();
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(response => {
        this.response = response;
        if ((response?.error == null) || (response.statusCode == this.ok)) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          this.router.navigate(['/order']);
        } else return;
      });
    } else {
      this.markAllAsTouched();
    }
  }
}
