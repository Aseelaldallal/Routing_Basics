import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, 
              private router: Router,
              private route: ActivatedRoute ) { }
  // Activated route injects currently active route

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    //this.router.navigate(['servers']); 
    // Navigate method doesn't know where you are. It doesn't know what the currently loaded route is
    // this.router.navigate(['servers', {relativeTo: this.route}]);
    // Angular knows what our currently active route is because of the ActivatedRoute injection. Now, relative to this.route, navigate to server 
  }

}
