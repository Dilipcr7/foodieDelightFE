import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: string): void {
    this.snackBar.open(error, "Error", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ["error-snackbar"],
    });
  }

  handleSuccess(success: string): void {
    this.snackBar.open(success, "Success", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ["success-snackbar"],
    });
  }
}
