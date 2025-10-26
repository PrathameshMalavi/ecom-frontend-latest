import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { MainAdminComponent } from "./main-admin.component";
import { NavComponent } from "./nav/nav.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ProductComponent } from "./pages/product/product.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { MatCard } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { CategoryComponent } from "./pages/category/category.component";
import { AddNewCategoryComponent } from "./pages/category/add-new-category/add-new-category.component";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MainAdminComponent,
    NavComponent,
    SidebarComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    AddNewCategoryComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIcon,
    MatCard,
    MatGridListModule,
    MatCardModule,
    MatFormField,
    MatLabel,
    MatFormField,
    MatLabel,
    // BrowserAnimationsModule,
  ],
})
export class AdminModule {}
