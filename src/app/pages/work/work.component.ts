import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, DefaultUrlSerializer, Router, UrlTree} from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.url.subscribe(() => {
      console.log(this.route.routeConfig.path);
    });
    console.log(this.route);
      // console.log(this.router.config.filter(v => {
      //   return v.path === ;
      //   }));

  }
}
