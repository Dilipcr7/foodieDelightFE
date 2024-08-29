import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  onSubmit() {
    if (
      this.authService.login(
        this.loginForm.value['email'],
        this.loginForm.value['password']
      )
    ) {
      this.messageService.handleSuccess(
        `Successfully LoggedIn, ${this.loginForm.value['email']}`
      );
      this.router.navigate(['/home']);
    } else {
      this.messageService.handleError('Incorrect UserName or Password');
    }
  }
}
