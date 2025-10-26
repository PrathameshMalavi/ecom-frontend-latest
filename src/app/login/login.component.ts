import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthService } from "../_services/user-auth.service";
import { UserService } from "../_services/user.service";
import { KeycloakService } from "../_auth/keycloak.service";
// import { KeycloakService } from "../_auth/keycloak.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  // private router = Inject(Router);

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private keycloak: KeycloakService
  ) {}

  async ngOnInit(): Promise<void> {
    // if (this.keycloak.keycloak.authenticated) {
    //   this.router.navigate(["home"]);
    //   return;
    // }
    // await this.keycloak.init();
    // await this.keycloak.login();
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === "Admin") {
          this.router.navigate(["/admin"]);
        } else {
          this.router.navigate(["/user"]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registerUser() {
    this.router.navigate(["/register"]);
  }
}
