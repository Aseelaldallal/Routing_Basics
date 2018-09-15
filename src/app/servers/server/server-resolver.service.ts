import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";

interface Server { // should put this somewhere else - outsource it
    id: number;
    name: string;
    status: string; 
}

@Injectable()

// loads our data in advance
export class ServerResolver implements Resolve<Server> {

    constructor(private serversService: ServersService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Server> | Promise<Server> | Server {
        return this.serversService.getServer(+route.params['id']);
    }
}