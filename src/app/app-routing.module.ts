import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddNewProductComponent } from "./add-new-product/add-new-product.component";
import { AdminComponent } from "./admin/admin.component";
import { BuyProductResolverService } from "./buy-product-resolver.service";
import { BuyProductComponent } from "./buy-product/buy-product.component";
import { CartComponent } from "./cart/cart.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { ProductResolveService } from "./product-resolve.service";
import { ProductViewDetailsComponent } from "./product-view-details/product-view-details.component";
import { RegisterComponent } from "./register/register.component";
import { ShowProductDetailsComponent } from "./show-product-details/show-product-details.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./_auth/auth.guard";
import { AdminModule } from "./admin_module/admin.module";
import { newRoles } from "./enviroments";
import { AddNewCategoryComponent } from "./admin_module/pages/category/add-new-category/add-new-category.component";
import { AddCarouselComponent } from "./carousel-component/add-carousel/add-carousel.component";
import { CarouselComponentComponent } from "./carousel-component/carousel-component.component";
import { ManageCarouselComponent } from "./carousel-component/manage-carousel/manage-carousel.component";

const routes: Routes = [
  // {
  //   path: "temp",
  //   component: AddCarouselComponent,
  //   // canActivate: [AuthGuard],
  //   // data: { roles: [newRoles.admin] },
  // },
  // {
  //   path: "temp2",
  //   component: CarouselComponentComponent,
  //   // canActivate: [AuthGuard],
  //   // data: { roles: [newRoles.admin] },
  // },
  // {
  //   path: "temp3",
  //   component: ManageCarouselComponent,
  //   // canActivate: [AuthGuard],
  //   // data: { roles: [newRoles.admin] },
  // },
  // {
  //   path: "",
  //   redirectTo: "login",
  // },
  { path: "", component: HomeComponent },
  {
    path: "productViewDetails",
    component: ProductViewDetailsComponent,
    resolve: { product: ProductResolveService },
  },
  { path: "forbidden", component: ForbiddenComponent },
  // { path: "login", component: LoginComponent },
  // { path: "register", component: RegisterComponent },

  {
    path: "user",
    component: UserComponent, // acts as main layout or parent
    canActivate: [AuthGuard],
    data: { roles: [newRoles.user] },
    children: [
      {
        path: "home",
        component: HomeComponent, // if you have a specific home page
      },
      {
        path: "productViewDetails",
        component: ProductViewDetailsComponent,
        resolve: { product: ProductResolveService },
      },
      {
        path: "buyProduct",
        component: BuyProductComponent,
        resolve: {
          productDetails: BuyProductResolverService,
        },
      },
      {
        path: "cart",
        component: CartComponent,
      },
      {
        path: "orderConfirm",
        component: OrderConfirmationComponent,
      },
      {
        path: "myOrders",
        component: MyOrdersComponent,
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
    ],
  },

  //
  //
  //
  //
  // User Roles
  // {
  //   path: "user",
  //   component: UserComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.user] },
  // },
  // {
  //   path: "buyProduct",
  //   component: BuyProductComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.user] },
  //   resolve: {
  //     productDetails: BuyProductResolverService,
  //   },
  // },
  // {
  //   path: "cart",
  //   component: CartComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.user] },
  // },
  // {
  //   path: "orderConfirm",
  //   component: OrderConfirmationComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.user] },
  // },
  // {
  //   path: "myOrders",
  //   component: MyOrdersComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.user] },
  // },

  // Admin Routes
  {
    path: "admin",
    component: AdminComponent, // acts as main layout (header, sidebar, etc.)
    canActivate: [AuthGuard],
    data: { roles: [newRoles.admin] },
    children: [
      {
        path: "",
        redirectTo: "showProductDetails",
        pathMatch: "full",
      },
      {
        path: "addNewProduct",
        component: AddNewProductComponent,
        resolve: {
          product: ProductResolveService,
        },
      },
      {
        path: "manageCarousel",
        component: ManageCarouselComponent,
      },
      {
        path: "addNewCarousel",
        component: AddCarouselComponent,
      },
      {
        path: "showProductDetails",
        component: ShowProductDetailsComponent,
      },
      {
        path: "orderInformation",
        component: OrderDetailsComponent,
      },
      {
        path: "adminMod",
        loadChildren: () =>
          import("./admin_module/admin.module").then((m) => m.AdminModule),
      },
    ],
  },

  //
  //
  //
  //
  // Admin Roles
  // {
  //   path: "admin",
  //   component: AdminComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.admin] },
  // },
  // {
  //   path: "addNewProduct",
  //   component: AddNewProductComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.admin] },
  //   resolve: {
  //     product: ProductResolveService,
  //   },
  // },
  // {
  //   path: "addNewCarousel",
  //   component: AddCarouselComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.admin] },
  // },
  // {
  //   path: "manageCarousel",
  //   component: ManageCarouselComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.admin] },
  // },
  // {
  //   path: "showProductDetails",
  //   component: ShowProductDetailsComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.admin] },
  // },
  // {
  //   path: "orderInformation",
  //   component: OrderDetailsComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.admin] },
  // },
  // {
  //   path: "adminMod",
  //   canActivate: [AuthGuard],
  //   data: { roles: [newRoles.admin] },
  //   loadChildren: () =>
  //     import("./admin_module/admin.module").then((m) => m.AdminModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
