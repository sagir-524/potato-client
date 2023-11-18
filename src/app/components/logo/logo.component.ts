import { Component, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-logo",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./logo.component.html",
  styleUrl: "./logo.component.scss",
})
export class LogoComponent {}
