import { NgModule } from "@angular/core";
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGaurd } from "./auth-gaurd.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent }, //localhost:4200
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]}, 
    { path: 'servers', 
      // canActivate: [ AuthGaurd ], 
      canActivateChild: [AuthGaurd],  // now only child routes are protected
      component: ServersComponent, 
      children: [
          { path: ':id', component: ServerComponent},
          { path: ':id/edit', component: EditServerComponent }
      ]
    },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found'} // wildcard route - ORDER IMPORTANT: Has to be the last
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ] // what should be accessible to modules importing this modules?
    // exporting configured RouterModule
})

export class AppRoutingModule {

}