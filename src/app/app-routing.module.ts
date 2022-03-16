import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'users', loadChildren:
    () => import('./features/users-summary/users-summary.module').then(m => m.UsersSummaryModule) },
                        { path: '', redirectTo:'/users', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
