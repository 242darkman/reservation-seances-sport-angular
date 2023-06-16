import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import get from 'lodash/get';
import { AuthService } from '@/app/auth/application/services/auth.service';
import * as bcrypt from 'bcryptjs';
import { filter, head } from 'lodash';
import { User } from '@/app/user/domain/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const userName: string = get(this.loginForm.value, 'username');
      const password: string = get(this.loginForm.value, 'password');
      this.authService.login(userName).subscribe((user: any) => {
        const userToLogged = filter(user, (u) => {
          const userPassword = get(u, 'password');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const isUserPasswordRight = bcrypt.compareSync(password, userPassword);
          return isUserPasswordRight;
        });
        const loggedUser: User = head(userToLogged);
        this.authService.setCurrentUser(loggedUser);
        const token = this.authService.generateToken(loggedUser);
        localStorage.setItem('app_token', token);
        void this.router.navigateByUrl('/');
        this.isLoading = false;
      });
    }
  }
}
