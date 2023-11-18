import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { LoginResponse } from "./login.response";
import { AuthService } from "../../auth.service";
import { UnprocessableEntity } from "../../../../types/responses/unprocessable-entity.response";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  form = this.fb.group({
    email: this.fb.nonNullable.control<string>("", [
      Validators.required,
      Validators.email,
    ]),
    password: this.fb.nonNullable.control<string>("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
  });

  submitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  login(): void {
    if (this.form.invalid) {
      this.toastr.error("Invalid information", "Error");
      return;
    }

    this.submitting = true;
    this.http.post<LoginResponse>("/auth/login", this.form.value).subscribe({
      next: (res) => {
        this.authService.login(res.token, res.refreshToken);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 422) {
          const errors = error.error as UnprocessableEntity;
          let message = errors
            .map((item) => {
              return `<strong>${item.path[0]}: </strong> ${item.message}`;
            })
            .join("<br>");

          this.toastr.error(message, "Invalid data", {
            enableHtml: true,
          });
        } else if (error.status === 400) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.toastr.error('Something went wrong. Please try again later.', 'Internal server error');
        }
        this.submitting = false;
      },
      complete: () => {
        this.submitting = false;
      },
    });
  }
}
