import { NgModule } from '@angular/core';
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  // },
  {
    path: '',
    loadChildren: () =>
      import('../app/tab/tab.module').then((m) => m.TabPageModule),
  },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./Pages/home/folder.module').then((m) => m.FolderPageModule),
  // },
  {
    path: 'cart',
    loadChildren: () =>
      import('./Pages/cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./Pages/payment/payment.module').then((m) => m.PaymentPageModule),
  },
  {
    path: 'payment/:id',
    loadChildren: () =>
      import('./Pages/payment/payment.module').then((m) => m.PaymentPageModule),
  },
  {
    path: 'confirm',
    loadChildren: () =>
      import('./Pages/confirm/confirm.module').then((m) => m.ConfirmPageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./Pages/search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./Pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./Pages/orders/orders.module').then((m) => m.OrdersPageModule),
  },
  {
    path: 'address',
    loadChildren: () =>
      import('./Pages/address/address.module').then((m) => m.AddressPageModule),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./Pages/notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./Pages/contact/contact.module').then((m) => m.ContactPageModule),
  },
  {
    path: 'tnc',
    loadChildren: () =>
      import('./Pages/tnc/tnc.module').then((m) => m.TncPageModule),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./Pages/faq/faq.module').then((m) => m.FaqPageModule),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./Pages/privacy/privacy.module').then((m) => m.PrivacyPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./Pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./Pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'loginmain',
    loadChildren: () =>
      import('./Pages/loginmain/loginmain.module').then(
        (m) => m.LoginmainPageModule
      ),
  },
  {
    path: 'registermain',
    loadChildren: () =>
      import('./Pages/registermain/registermain.module').then(
        (m) => m.RegistermainPageModule
      ),
  },
  {
    path: 'otpverification',
    loadChildren: () =>
      import('./Pages/otpverification/otpverification.module').then(
        (m) => m.OtpverificationPageModule
      ),
  },
  {
    path: 'productdet',
    loadChildren: () =>
      import('./Pages/productdet/productdet.module').then(
        (m) => m.ProductdetPageModule
      ),
  },
  {
    path: 'productdet/:id',
    loadChildren: () =>
      import('./Pages/productdet/productdet.module').then(
        (m) => m.ProductdetPageModule
      ),
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./Pages/onboarding/onboarding.module').then(
        (m) => m.OnboardingPageModule
      ),
  },
  {
    path: 'allproduct',
    loadChildren: () =>
      import('./Pages/allproduct/allproduct.module').then(
        (m) => m.AllproductPageModule
      ),
  },
  {
    path: 'allproduct/:id',
    loadChildren: () =>
      import('./Pages/allproduct/allproduct.module').then(
        (m) => m.AllproductPageModule
      ),
  },
  {
    path: 'selectcity',
    loadChildren: () =>
      import('./Pages/selectcity/selectcity.module').then(
        (m) => m.SelectcityPageModule
      ),
  },
  {
    path: 'select',
    loadChildren: () =>
      import('./Pages/select/select.module').then((m) => m.SelectPageModule),
  },
  {
    path: 'refund',
    loadChildren: () =>
      import('./Pages/refund/refund.module').then((m) => m.RefundPageModule),
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'navbar',
    loadChildren: () =>
      import('./Pages/navbar/navbar.module').then((m) => m.NavbarPageModule),
  },
  {
    path: 'tab',
    loadChildren: () => import('./tab/tab.module').then((m) => m.TabPageModule),
  },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./Pages/recipe/recipe.module').then((m) => m.RecipePageModule),
  },
  {
    path: 'recipe/:id',
    loadChildren: () =>
      import('./Pages/recipe/recipe.module').then((m) => m.RecipePageModule),
  },
  {
    path: 'selectaddress',
    loadChildren: () =>
      import('./Pages/selectaddress/selectaddress.module').then(
        (m) => m.SelectaddressPageModule
      ),
  },
  {
    path: 'nutrivalue',
    loadChildren: () =>
      import('./Pages/nutrivalue/nutrivalue.module').then(
        (m) => m.NutrivaluePageModule
      ),
  },
  {
    path: 'nutrivalue/:id',
    loadChildren: () =>
      import('./Pages/nutrivalue/nutrivalue.module').then(
        (m) => m.NutrivaluePageModule
      ),
  },
  {
    path: 'searchbar',
    loadChildren: () =>
      import('./Pages/searchbar/searchbar.module').then(
        (m) => m.SearchbarPageModule
      ),
  },
  {
    path: 'support',
    loadChildren: () => import('./Pages/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'addressmodal',
    loadChildren: () => import('./Pages/addressmodal/addressmodal.module').then( m => m.AddressmodalPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
