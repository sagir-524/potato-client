import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "auth",
    loadComponent: () =>
      import("./features/auth/auth.component").then((c) => c.AuthComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "login",
      },
      {
        path: "login",
        loadComponent: () =>
          import("./features/auth/pages/login/login.component").then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: "register",
        loadComponent: () =>
          import("./features/auth/pages/register/register.component").then(
            (c) => c.RegisterComponent
          ),
      },
    ],
  },
];
