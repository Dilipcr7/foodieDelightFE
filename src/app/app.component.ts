import { Component } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
import { NavigationEnd, Router } from "@angular/router";
import { MessageService } from "./services/message.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/login" && this.isLoggedIn) {
          this.messageService.handleError("Logged Out");
          this.authService.logout();
        }
      }
    });
  }
}
