import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError, of } from "rxjs";
import { catchError, map, tap, retry } from "rxjs/operators";

import { User } from "./models/user";
import { environment } from "./../environments/environment";



const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {

  env = environment;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  // Get users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.env.serverURL + "/users").pipe(
      // catchError(this.handleError)
    );
  }

  // Get single user
  getUser(id: number): Observable<User> {
    const url = `${this.env.serverURL}/users/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>("We're sorry! The specified user doesn't exist. Please, try again"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
