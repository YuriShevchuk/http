import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from './user';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  // postData(user: User) {
  //   const body = {name: user.name, age: user.age};
  //   return this.http.post('http://localhost:3000/postuser', body);
  // }
  postData(user: User) {
    const myHeaders = new HttpHeaders().set('Authorization', 'my-auth-token');
    return this.http.post('http://localhost:3000/postuser', user, {headers:myHeaders});
  }

  getData() {
    return this.http.get('assets/users.json')
      .pipe(
        map( (data: any) => {
          const usersList = data["userList"];
          return usersList.map(function(user: any): User {
            return new User(user.userName, user.userAge);
          });
        } )
      );
  }

  getSum(num1: number, num2: number) {
    const params = new HttpParams()
    .set('num1', num1.toString())
    .set('num2', num2.toString());
    return this.http.get('http://localhost:3000/sum', {params});
    // return this.http.get('http://localhost:3000/sum?num1=' + num1 + "&num2=" + num2);
  }
}
