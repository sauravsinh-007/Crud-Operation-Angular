import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/users'

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  createUser(user: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/createUser`, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/updateUser/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/deleteUser/${id}`);
  }
}
