import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoApiService } from '../todo-api.service';
import { Router } from '@angular/router';

interface LoginDTO {
  email: string;
  password: string;
}

interface RegisterDTO {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-loginscreen',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './loginscreen.component.html',
  styleUrl: './loginscreen.component.scss',
})
export class LoginscreenComponent {
  constructor(private api: TodoApiService, private route: Router) {}
  login: LoginDTO = {
    email: '',
    password: '',
  };
  register: RegisterDTO = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  isRegister = false;
  passwordNotMatch = false;

  handleRegisterMode() {
    this.isRegister = !this.isRegister;
  }

  submitLogin() {
    this.api.login(this.login.email, this.login.password).subscribe(
      (res: any) => {
        localStorage.setItem('BEARER_TOKEN', res.token);
        localStorage.setItem('USER', JSON.stringify(res.user));
        this.route.navigate(['/app']);
      },
      (err) => window.alert('Usuário ou senha incorreto')
    );
  }
  submitSignup() {
    if (this.register.password !== this.register.confirmPassword) {
      this.passwordNotMatch = true;
    } else {
      this.api
        .signup(this.register.email, this.register.password)
        .subscribe((res) => {
          window.alert('Usuário criado com sucesso');
          this.isRegister = false;
        });
      this.passwordNotMatch = false;
    }
  }
}
