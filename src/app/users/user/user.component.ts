import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  // ActivatedRoute: Currently loaded route 
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'], 
      name: this.route.snapshot.params['name']
    }
    // params is an observable - feature which allows you to work with async tasks
    this.route.params.subscribe(
      (params: Params ) => { 
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )
  }


}
