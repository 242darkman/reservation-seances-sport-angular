import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import get from 'lodash/get';
import * as bcrypt from 'bcryptjs';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserFacadeService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.checkPassword();
    });

    this.registerForm.controls['confirmPassword'].valueChanges.subscribe(() => {
      this.checkPassword();
    });
  }

  private passwordMatch() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ passwordDoesNotMatch: true });
    } else {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }
  }

  checkPassword() {
    this.passwordMatch();
  }

  onRegister() {
    const salt = bcrypt.genSaltSync(10);
    if (this.registerForm.valid) {
      this.isLoading = true;

      const id: number = this.userService.generateId();
      const userName: string = get(this.registerForm.value, 'userName');
      const firstName: string = get(this.registerForm.value, 'firstName');
      const lastName: string = get(this.registerForm.value, 'lastName');
      const email: string = get(this.registerForm.value, 'email');
      const plainPassword: string = get(this.registerForm.value, 'password');
      const password: string = bcrypt.hashSync(plainPassword, salt);
      const user = { id, userName, firstName, lastName, email, password };
      this.userService.addUser(user).subscribe(() => {
        void this.router.navigateByUrl('/login');
        this.isLoading = false;
      });
    }
  }
}
