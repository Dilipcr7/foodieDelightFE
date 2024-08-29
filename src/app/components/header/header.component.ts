import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  logout() {
    this.router.navigate(['./login']);
    this.messageService.handleError('Logged Out, Please Login Again');
    this.authService.logout();
  }
}
