import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";

import {MessageService} from "../message.service";
import { UserService } from "../user.service";
import { User } from "../models/user";

@Component({
  selector: "fes-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private messageService:MessageService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private readonly router: Router
  ) {
    // This loads the page always at the top.
    this.router.events.subscribe((e)=>{
      if (e instanceof NavigationEnd){
        window.scrollTo(0,0)
      }
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.userService.getUser(id).subscribe(user => 
      (this.user = user));
  }

  goBack(): void {
    // this.location.back();
    this.router.navigate(['/users']);
  }
}
