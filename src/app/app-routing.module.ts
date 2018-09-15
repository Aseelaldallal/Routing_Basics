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
import { CanDeactivateGaurd } from "./servers/edit-server/can-deactivate-gaurd.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

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
          { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}}, // this will map the data this resolver gives us back to server property
          { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGaurd] } // angular will run this gaurd when we try to leave this path
      ]
    },
    { path: 'not-found', component: PageNotFoundComponent },
    // { path: '**', redirectTo: '/not-found'} // wildcard route - ORDER IMPORTANT: Has to be the last
    { path: '**', component: ErrorPageComponent, data: {message: 'Page Not Found'}}
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true}) // informs web server only care about the part in the url before hashtag - so this will also run on servers which don't return index.html (make sure your server returns index.html, but if you cant then this useHash)
    ],
    exports: [
        RouterModule
    ] // what should be accessible to modules importing this modules?
    // exporting configured RouterModule
})

export class AppRoutingModule {

}