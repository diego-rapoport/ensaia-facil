import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'user/dashboard',
    loadChildren: () =>
      import('./user/dashboard.module').then((m) => m.DashboardModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
