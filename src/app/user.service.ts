import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
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
  // Json-server domain:
  serverURL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  // Get users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serverURL + "/users").pipe(
      catchError(this.handleError)
    );
  }

  // Get single user
  getUser(id: number): Observable<User> {
    const url = `${this.serverURL}/users/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
