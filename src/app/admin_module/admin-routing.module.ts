import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainAdminComponent } from "./main-admin.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CategoryComponent } from "./pages/category/category.component";
import { ProductComponent } from "./pages/product/product.component";
import { AddNewProductComponent } from "./pages/add-new-product/add-new-product.component";
import { AddNewCategoryComponent } from "./pages/category/add-new-category/add-new-category.component";
import { ProductResolverService } from "./a_temp/services/product-resolver-service.service";

const routes: Routes = [
  {
    path: "",
    component: MainAdminComponent, // Base wrapper with sidebar + nav
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" }, // default child route
      { path: "dashboard", component: DashboardComponent },
      { path: "category", component: CategoryComponent },
      {
        path: "addNewProducttemp",
        component: AddNewProductComponent,
        resolve: {
          product: ProductResolverService,
        },
      },
      { path: "producttemp", component: ProductComponent },
      // More sidebar navigation routes here
    ],
  },
  {
    path: "test1",
    component: AddNewCategoryComponent,
  },
  {
    path: "test2",
    component: AddNewProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
