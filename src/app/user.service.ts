import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { Router } from "@angular/router";

import { Observable, throwError, of } from "rxjs";
import { catchError, map, tap, retry } from "rxjs/operators";

import { User } from "./models/user";
import { MessageService } from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  env = environment;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private route: Router
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  /** Log a message with the MessageService */
  private log(message: string) {
    this.messageService.clear();
    this.messageService.add(`${message}`); //
  }

  // Get users
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.env.serverURL + "/users")
      .pipe(
        catchError(
          this.handleError<User[]>(
            "We couldn't retrieve users' information. Please try again."
          )
        )
      );
  }

  // Get single user
  getUser(id: number): Observable<User> {
    const url = `${this.env.serverURL}/users/${id}`;
    return this.http
      .get<User>(url)
      .pipe(
        catchError(
          this.handleError<User>(
            "We're sorry! The specified user doesn't exist. Please, try again."
          )
        )
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
