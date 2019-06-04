import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";

import { MessageService } from "../message.service";
import { stringify } from '@angular/core/src/util';

@Component({
  selector: "fes-error-notification",
  templateUrl: "./error-notification.component.html",
  styleUrls: ["./error-notification.component.css"]
})
export class ErrorNotificationComponent implements OnInit {
  constructor(public messageService: MessageService, private route:Router ) {
  }

  ngOnInit() {
    if (this.messageService.messages.length!==0){
    setTimeout(()=> {
      this.route.navigate(['/users']);
    },5000);
  }
  }
}
